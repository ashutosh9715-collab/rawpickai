const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const root = process.cwd();
const reviewsDir = path.join(root, "content", "reviews");

function count(text, regex) {
  return (text.match(regex) || []).length;
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]/g, " ");
}

const rows = fs
  .readdirSync(reviewsDir)
  .filter((name) => name.endsWith(".md"))
  .sort()
  .map((name) => {
    const file = path.join(reviewsDir, name);
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const slug = name.replace(/-review\.md$/, "").replace(/\.md$/, "");
    const images = [...content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => ({ alt: m[1], src: m[2] }));
    const localImages = images.filter((image) => image.src.startsWith("/"));
    const rasterImages = localImages.filter((image) => /\.(png|jpe?g|webp)(?:\?|$)/i.test(image.src));
    const svgImages = localImages.filter((image) => /\.svg(?:\?|$)/i.test(image.src));
    const missingImages = localImages.filter((image) => !fs.existsSync(path.join(root, "public", image.src)));
    const plain = stripMarkdown(content);
    const words = plain.split(/\s+/).filter(Boolean);
    const firstPersonSingular = count(plain, /\b(I|I&apos;m|I’ve|I've|I tested|I used|my|me)\b/gi);
    const firstPersonPlural = count(plain, /\b(we|we've|we tested|we used|our)\b/gi);
    const explicitTesting = count(
      plain,
      /\b(I|we)\s+(personally\s+)?(tested|used|ran|uploaded|generated|created|tried|spent|subscribed|paid|compared|installed|set up|logged|tracked|measured|recorded)\b/gi
    );
    const evidenceTerms = count(
      plain,
      /\b(testing setup|test prompt|same prompt|test results?|output screenshot|my testing|our testing|during testing|in my test|in our test|credits? consumed|generation time|acceptance rate|trial|subscription|invoice)\b/gi
    );
    const externalLinks = [...content.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    const disclosure = /provided by|sponsored|affiliate|review access|free credits|press account|complimentary/i.test(content);
    const versionTitle = /\b(v?\d+(?:\.\d+)+|gpt-\d|gen-\d|opus \d|sonnet \d)\b/i.test(String(data.title || ""));

    const evidenceScore =
      Math.min(rasterImages.length, 4) * 3 +
      Math.min(explicitTesting, 6) * 2 +
      Math.min(evidenceTerms, 6) +
      (firstPersonSingular >= 5 ? 2 : 0) +
      (words.length >= 1500 ? 1 : 0) +
      (disclosure ? 1 : 0);

    return {
      slug,
      title: data.title || "",
      lastUpdated: String(data.lastUpdated || ""),
      words: words.length,
      images: images.length,
      rasterImages: rasterImages.length,
      rasterPaths: rasterImages.map((image) => image.src).join(" | "),
      svgImages: svgImages.length,
      missingImages: missingImages.length,
      firstPersonSingular,
      firstPersonPlural,
      explicitTesting,
      evidenceTerms,
      externalLinks: new Set(externalLinks).size,
      disclosure,
      versionTitle,
      evidenceScore,
    };
  });

const columns = Object.keys(rows[0]);
const escapeCsv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
const csv = [columns.map(escapeCsv).join(","), ...rows.map((row) => columns.map((key) => escapeCsv(row[key])).join(","))].join("\n");

const outDir = path.join(root, "audit");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "review-evidence.csv"), `${csv}\n`);
fs.writeFileSync(path.join(outDir, "review-evidence.json"), `${JSON.stringify(rows, null, 2)}\n`);

const ranked = [...rows].sort((a, b) => b.evidenceScore - a.evidenceScore || a.slug.localeCompare(b.slug));
console.log(JSON.stringify({
  total: rows.length,
  withRasterEvidence: rows.filter((row) => row.rasterImages > 0).length,
  withThreeRasterImages: rows.filter((row) => row.rasterImages >= 3).length,
  withExplicitTesting: rows.filter((row) => row.explicitTesting > 0).length,
  withStrongEvidenceTerms: rows.filter((row) => row.evidenceTerms >= 3).length,
  missingImages: rows.reduce((sum, row) => sum + row.missingImages, 0),
  top: ranked.slice(0, 15).map((row) => ({ slug: row.slug, score: row.evidenceScore, raster: row.rasterImages, tests: row.explicitTesting, terms: row.evidenceTerms, words: row.words })),
  bottom: ranked.slice(-15).map((row) => ({ slug: row.slug, score: row.evidenceScore, raster: row.rasterImages, tests: row.explicitTesting, terms: row.evidenceTerms, words: row.words })),
}, null, 2));
