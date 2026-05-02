import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calcReadingTime } from "./reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover: string;
  featured?: boolean;
  readTime?: number;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

function readPost(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  const frontmatter = data as PostFrontmatter;
  const rawDate = (data as Record<string, unknown>).date;
  const date = rawDate instanceof Date
    ? rawDate.toISOString().slice(0, 10)
    : String(rawDate);

  return {
    ...frontmatter,
    slug,
    content,
    date,
    readTime: frontmatter.readTime ?? calcReadingTime(content),
    tags: frontmatter.tags ?? [],
    cover: frontmatter.cover ?? "var(--accent)",
    featured: frontmatter.featured ?? false,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => {
      const { content: _, ...meta } = readPost(f);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const filename of candidates) {
    const fullPath = path.join(POSTS_DIR, filename);
    if (fs.existsSync(fullPath)) return readPost(filename);
  }
  return null;
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const set = new Set(posts.map((p) => p.category));
  return Array.from(set);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const set = new Set(posts.flatMap((p) => p.tags));
  return Array.from(set);
}
