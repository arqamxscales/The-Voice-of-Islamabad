import type { Locale } from "@/lib/i18n";

export type Category =
  | "news"
  | "media"
  | "business"
  | "politics"
  | "technology";

export interface Post {
  slug: string;
  date: string;
  category: Category;
  coverImage: string;
  author: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  content: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  ticker: Record<Locale, string[]>;
  about: Record<Locale, string>;
  contact: {
    email: string;
    phone: string;
    address: Record<Locale, string>;
  };
}
