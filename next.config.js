/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // SEO FIX: Redirect year-stamped best-of URLs to year-agnostic ones
  // This future-proofs the site — next year you don't lose link equity via re-redirects
  async redirects() {
    return [
      { source: "/best-of/best-ai-writing-tools-2026", destination: "/best-of/best-ai-writing-tools", permanent: true },
      { source: "/best-of/best-ai-code-assistants-2026", destination: "/best-of/best-ai-code-assistants", permanent: true },
      { source: "/best-of/best-free-ai-tools-2026", destination: "/best-of/best-free-ai-tools", permanent: true },
      { source: "/best-of/best-chatgpt-alternatives-2026", destination: "/best-of/best-chatgpt-alternatives", permanent: true },
      { source: "/best-of/best-ai-image-generators-2026", destination: "/best-of/best-ai-image-generators", permanent: true },
      { source: "/best-of/best-ai-video-generators-2026", destination: "/best-of/best-ai-video-generators", permanent: true },
      { source: "/best-of/best-ai-presentation-tools-2026", destination: "/best-of/best-ai-presentation-tools", permanent: true },
      { source: "/best-of/best-ai-tools-for-students-2026", destination: "/best-of/best-ai-tools-for-students", permanent: true },
      // Catch future years too
      { source: "/best-of/:slug-2027", destination: "/best-of/:slug", permanent: true },
      { source: "/best-of/:slug-2028", destination: "/best-of/:slug", permanent: true },
      // News roundup URL variations (catch wrong URLs from bots/typos/old indexes)
      { source: "/ai-tool-news-roundup-week-of-april-7-2026", destination: "/blog/ai-tool-news-roundup-april-7-2026", permanent: true },
      { source: "/ai-news-roundup-april-7-2026", destination: "/blog/ai-tool-news-roundup-april-7-2026", permanent: true },
      { source: "/blog/ai-news-roundup-april-7-2026", destination: "/blog/ai-tool-news-roundup-april-7-2026", permanent: true },
      { source: "/ai-tool-news-roundup-april-7-2026", destination: "/blog/ai-tool-news-roundup-april-7-2026", permanent: true },
      // April 14 roundup was never published — redirect to April 17
      { source: "/blog/ai-tool-news-roundup-april-14-2026", destination: "/blog/ai-tool-news-roundup-april-17-2026", permanent: true },
      { source: "/ai-tool-news-roundup-april-14-2026", destination: "/blog/ai-tool-news-roundup-april-17-2026", permanent: true },
    ];
  },
};

module.exports = nextConfig;
