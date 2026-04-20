import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Category, Post, SiteConfig } from "@/lib/types";

const contentDir = path.join(process.cwd(), "content");
const postsDir = path.join(contentDir, "posts");
const siteConfigPath = path.join(contentDir, "site.json");

interface PostFrontmatter {
  slug: string;
  date: string;
  category: Category;
  coverImage: string;
  author: string;
  title_en: string;
  title_ur: string;
  excerpt_en: string;
  excerpt_ur: string;
}

export function getSiteConfig(): SiteConfig {
  const raw = fs.readFileSync(siteConfigPath, "utf8");
  return JSON.parse(raw) as SiteConfig;
}

export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(postsDir)
    .filter((file: string) => file.endsWith(".md"));

  const posts = files.map((file: string) => {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;

    return {
      slug: fm.slug,
      date: fm.date,
      category: fm.category,
      coverImage: fm.coverImage,
      author: fm.author,
      title: {
        en: fm.title_en,
        ur: fm.title_ur
      },
      excerpt: {
        en: fm.excerpt_en,
        ur: fm.excerpt_ur
      },
      content
    } satisfies Post;
  });

  return posts.sort(
    (a: Post, b: Post) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: Category): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export async function renderMarkdown(markdown: string): Promise<string> {
  return marked.parse(markdown) as Promise<string>;
}
