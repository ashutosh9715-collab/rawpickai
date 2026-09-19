#!/usr/bin/env node
/**
 * IndexNow submission script for RawPickAI.
 *
 * Submits URLs to IndexNow (Bing, Yandex, Seznam, Naver) so they crawl new/changed
 * pages within hours instead of waiting for organic discovery.
 *
 * SAFETY: Reads the IndexNow key from an environment variable so the key never
 * enters the public git repository.
 *
 * SETUP: see README-INDEXNOW.md in the repo root.
 *
 * USAGE:
 *   Submit all sitemap URLs:
 *     INDEXNOW_KEY=your_key node scripts/indexnow.mjs
 *
 *   Or with env var already exported:
 *     node scripts/indexnow.mjs
 *
 *   Submit specific URLs only:
 *     node scripts/indexnow.mjs https://rawpickai.com/review/manus-ai
 */

const KEY = process.env.INDEXNOW_KEY;
const HOST = 'rawpickai.com';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

if (!KEY) {
  console.error('❌ INDEXNOW_KEY environment variable not set.');
  console.error('   Run: export INDEXNOW_KEY=your_key_here');
  console.error('   Or add it to your ~/.zshrc to persist.');
  process.exit(1);
}

if (!/^[a-zA-Z0-9]{8,128}$/.test(KEY)) {
  console.error('❌ INDEXNOW_KEY must be 8-128 alphanumeric characters.');
  process.exit(1);
}

const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function getUrls() {
  const cliUrls = process.argv.slice(2).filter(u => u.startsWith('http'));
  if (cliUrls.length > 0) {
    console.log(`Using ${cliUrls.length} URL(s) from CLI args`);
    return cliUrls;
  }
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`Found ${urls.length} URLs in sitemap`);
  return urls;
}

async function submit(urls) {
  if (urls.length === 0) {
    console.error('No URLs to submit');
    return;
  }
  const batches = [];
  for (let i = 0; i < urls.length; i += 10000) {
    batches.push(urls.slice(i, i + 10000));
  }
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch };
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`✅ Batch ${i + 1}/${batches.length}: ${batch.length} URLs accepted (${res.status})`);
    } else {
      const text = await res.text().catch(() => '');
      console.error(`❌ Batch ${i + 1}/${batches.length} failed: ${res.status} ${res.statusText}`);
      if (text) console.error(`   Response: ${text.slice(0, 200)}`);
    }
  }
}

(async () => {
  try {
    const urls = await getUrls();
    await submit(urls);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
