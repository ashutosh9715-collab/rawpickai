export interface Tool {
  slug: string;
  name: string;
  letter: string;
  gradient: string;
  color: string;
  colorSoft: string;
  tagline: string;
  category: string;
  subcategory: string;
  rating: number;
  verdict: string;
  pricingTier: string;
  lastUpdated: string;
  founded: string;
  hq: string;
  users: string;
  url: string;

  summary: string;
  sections: { title: string; body: string }[];

  pros: { point: string; detail: string }[];
  cons: { point: string; detail: string }[];

  scores: Record<string, number>;

  pricing: {
    name: string;
    price: string;
    period?: string;
    features: string[];
    popular?: boolean;
  }[];

  bestFor: string[];
  notFor: string[];

  features: Record<string, { val: string; strength: "strong" | "neutral" | "weak" }>;

  faq: { q: string; a: string }[];

  alternatives: {
    slug: string;
    name: string;
    rating: number;
    price: string;
    badge?: string;
  }[];
}

export interface Comparison {
  slug: string;
  toolA: string; // slug reference
  toolB: string;
  verdict: {
    winner: string;
    summary: string;
    chooseA: string[];
    chooseB: string[];
  };
}

export interface BestOfList {
  slug: string;
  title: string;
  year: string;
  subtitle: string;
  updated: string;
  readTime: string;
  category: string;
  topPick: string;
  tools: {
    slug: string;
    rank: number;
    tagline: string;
    badge?: string;
    summary: string;
    keyStrengths: string[];
    bestFor: string;
    scores: { quality: number; ease: number; value: number };
  }[];
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  count: number;
  description: string;
  longDescription?: string;
}
