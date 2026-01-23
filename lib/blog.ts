// Blog data types and utilities
// This module is the seam to later swap to WPGraphQL without changing URLs or page components

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface BlogPostFrontmatter {
  title: string;
  date: string; // YYYY-MM-DD format
  description?: string;
  tags?: string[];
  series?: string;
  project?: string;
  draft?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'blog');

/**
 * Get all blog posts, sorted by date (newest first).
 * In production, filters out posts with draft: true.
 */
export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as BlogPostFrontmatter,
        content,
      };
    })
    .filter((post) => {
      // In production, filter out draft posts
      if (process.env.NODE_ENV === 'production' && post.frontmatter.draft === true) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by date, newest first
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });

  return allPostsData;
}

/**
 * Get a single blog post by slug.
 * Returns null if post doesn't exist or is a draft in production.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogPostFrontmatter;

  // In production, return null for draft posts
  if (process.env.NODE_ENV === 'production' && frontmatter.draft === true) {
    return null;
  }

  return {
    slug,
    frontmatter,
    content,
  };
}

/**
 * Get all blog post slugs (for static generation).
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

/**
 * Get all unique tags from all blog posts, sorted alphabetically.
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach((tag) => tagSet.add(tag));
    }
  });

  return Array.from(tagSet).sort();
}

/**
 * Get all unique series from all blog posts, sorted alphabetically.
 */
export function getAllSeries(): string[] {
  const posts = getAllPosts();
  const seriesSet = new Set<string>();

  posts.forEach((post) => {
    if (post.frontmatter.series) {
      seriesSet.add(post.frontmatter.series);
    }
  });

  return Array.from(seriesSet).sort();
}
