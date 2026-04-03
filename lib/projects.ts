// Project data types and utilities

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type SiteType = 'public' | 'in-house' | 'application';
export type Framework = 'nextjs' | 'wordpress' | 'webflow' | 'builder' | 'custom' | 'other';
export type ServiceType = 'Brand Identity' | 'Design & Dev' | 'Motion & Media' | 'Launch Support' | 'Microsoft 365 Administrator';

export interface ProjectSite {
  name: string;
  url?: string;
  type: SiteType;
  framework: Framework;
  description?: string;
  isPrimary?: boolean; // Mark the main/public-facing site
}

export interface BrandColor {
  name: string;
  hex: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX body — the project overview
  heroImage?: string;
  logoMark?: string; // Path to logo mark image
  combinationMark?: string; // Path to combination mark image
  services?: ServiceType[]; // Services performed (Brand Identity, Design & Dev, Motion & Media, Launch Support)
  brandColors?: BrandColor[]; // Array of brand colors with names and hex values
  sites: ProjectSite[];
  technologies?: string[];
  year?: number;
  client?: string;
  category?: string;
  featured?: boolean;
}

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        ...(data as Omit<Project, 'slug' | 'content'>),
        content,
      };
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...(data as Omit<Project, 'slug' | 'content'>),
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

// Helper function to get framework label
export function getFrameworkLabel(framework: Framework): string {
  const labels: Record<Framework, string> = {
    nextjs: 'Next.js',
    wordpress: 'WordPress',
    webflow: 'Webflow',
    builder: 'Website Builder',
    custom: 'Custom',
    other: 'Other',
  };
  return labels[framework] || framework;
}

// Helper function to get site type label
export function getSiteTypeLabel(type: SiteType): string {
  const labels: Record<SiteType, string> = {
    public: 'Public Site',
    'in-house': 'In-House Application',
    application: 'Application',
  };
  return labels[type] || type;
}
