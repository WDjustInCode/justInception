// Project data types and utilities

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
  overview?: string;
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

// Example project data - replace with your actual data source
export const projects: Project[] = [
  {
    slug: 'justinception',
    title: 'JustInception Studio',
    description: 'Design, development, and AI-driven speed to help your brand lift off with confidence.',
    overview: 'justInception.studio is a personal studio project focused on building a scalable system for delivering production-ready digital experiences. Rather than a single site or application, the project centers on the architecture, workflows, and service model behind a modern solo studio, combining frontend engineering, UI/UX design, and content production into a cohesive framework. The site was implemented in both Next.js (React, Tailwind CSS) and WordPress, demonstrating the ability to translate the same design system and content structure across modern frontend frameworks and traditional CMS platforms. This dual implementation highlights system-level thinking, platform adaptability, and product-oriented decision-making in real-world client scenarios.',
    logoMark: '/justinception_logo_mark.png',
    combinationMark: '/justinception_combination_mark.png',
    services: ['Brand Identity', 'Design & Dev', 'Motion & Media', 'Launch Support'],
    brandColors: [
      { name: 'Purple', hex: '#8B5CF6' },
      { name: 'Yellow', hex: '#FBBF24' },
      { name: 'Blue', hex: '#3B82F6' },
      { name: 'Background', hex: '#0A0A0F' },
    ],
    sites: [
      {
        name: 'Public Website',
        url: 'https://justinception.com',
        type: 'public',
        framework: 'nextjs',
        description: 'Main public-facing website built with Next.js',
        isPrimary: true,
      },
      {
        name: 'WordPress Site',
        url: 'https://justinceptionstu-7uzyqctxsm.live-website.com/',
        type: 'public',
        framework: 'wordpress',
        description: 'This is a custom WordPress website I built to demonstrate my WordPress development capabilities alongside my primary Next.js implementation. I developed a fully custom classic WordPress theme without page builders or frameworks, focusing on clean structure, performance, and long-term maintainability. The front page uses a custom-built template, while the services modules page leverages Gutenberg blocks to demonstrate proficiency with both traditional theming and the modern WordPress block editor. The project reflects end-to-end ownership of a production WordPress environment, including managed hosting on IONOS, cross-provider domain and DNS configuration, branding integration, and real-world problem solving such as CSS caching and asset versioning. This site serves as a technical reference and proof of proficiency for client-facing WordPress projects.',
      },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Cursor', 'GitHub', 'WordPress', 'PHP', 'Gutenberg', 'Ionos Hosting', 'Adobe Illustrator', 'Adobe Photoshop', 'Grok Imagine'],
    year: 2025,
    category: 'Portfolio',
    featured: true,
  },
  {
    slug: 'locoal',
    title: 'LOCOAL',
    description: 'A platform connecting local businesses with their communities.',
    overview: `I worked at LOCOAL as a multidisciplinary web developer and product-focused systems engineer during the company's early startup phase through its growth after funding. In this role, I took on broad ownership across front-end development, application architecture, internal tools, analytics, infrastructure, and digital operations, often serving as the primary or sole developer on critical systems.

    A major focus of my work was the Rainmaker Monitoring application, a production single-page application built with Next.js and React. I designed and implemented a complex alert grouping and monitoring interface for managing real-time machine health data from Rainmaker units deployed in the field. This included advanced filtering, role-based access control, alert lifecycle management, duplicate alert grouping, expandable timelines, modal-based workflows, and real-time polling, all optimized for usability and performance with large alert datasets.
    
    \n\nI also contributed to LOCOAL’s internal Admin Center used to manage organizations, users, and site-level configurations, supporting the company’s multi-tenant operational model. In parallel, I developed embedded Power BI reporting for customers, enabling secure, self-service access to Rainmaker processing metrics and operational dashboards derived from raw machine telemetry.
    
    \n\nIn addition to application development, I designed and built the LOCOAL public website in Webflow, implementing responsive layouts, CMS-driven content, and performance optimizations to clearly communicate the company’s technology and mission. I also worked on structuring internal datasets for AI-enabled biomass conversion modeling, covering biomass classifications, machine comparisons, and biochar applications, with an emphasis on scientific rigor and commercial relevance.
    
    \n\nAlongside my engineering work, I serve as LOCOAL’s Microsoft 365 Global Administrator and primary liaison with outsourced IT security providers, managing access, security policies, and core digital infrastructure. Overall, my time at LOCOAL reflects full-stack ownership, strong product thinking, and the ability to operate effectively across engineering, operations, and customer-facing systems in a high-responsibility startup environment.`,
    services: ['Design & Dev', 'Launch Support', 'Microsoft 365 Administrator', 'Brand Identity', 'Motion & Media'],
    brandColors: [],
    sites: [
      {
        name: 'Public Website',
        url: 'https://locoal.com',
        type: 'public',
        framework: 'nextjs',
        isPrimary: true,
      },
      {
        name: 'Admin Dashboard',
        url: 'https://locoal.com/technology/impctai',
        type: 'in-house',
        framework: 'nextjs',
        description: 'Internal admin application for managing businesses and content',
      },
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Github', 'Jira', 'Cursor', 'AWS', 'Azure', 'Power BI', 'Postman', 'MySQL', 'Microsoft 365 Administrator', 'Webflow', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe After Effects', 'Adobe XD', 'Adobe InDesign' ],
    year: 2025,
    category: 'Platform',
  },
  {
    slug: 'azul-pool-services',
    title: 'Azul Pool Services',
    description: 'Professional pool maintenance and service company website.',
    overview: `Azul Pool Services was designed and developed as a complete end-to-end digital product, not just a visual brand. In addition to establishing the brand identity, the project included the design and build of a customer-facing website with a structured, conversion-oriented quote flow that guides users through service selection in a clear, low-friction manner. The interface emphasizes simplicity, readability, and trust, using intentional spacing, restrained motion, and consistent brand cues to make the experience feel calm and professional rather than sales-driven.
    \n\nOn the development side, the site includes a custom quote engine with dynamic pricing logic, form validation, and automated email handling to support real operational workflows. An internal admin dashboard was designed and implemented to allow the business to view, manage, and respond to incoming quote requests efficiently. The system was built with scalability and maintainability in mind, enabling future expansion of services, pricing rules, and customer communications. Together, the branding, UI/UX design, and application logic form a cohesive product that supports both customer acquisition and day-to-day business operations.`,
    services: ['Brand Identity', 'Design & Dev', 'Launch Support', 'Motion & Media'],
    combinationMark: '/combination_mark_light@1.5x.png',
    brandColors: [
      { name: 'Navy', hex: '#002147' },
      { name: 'Primary Blue', hex: '#0052cc' },
      { name: 'Sky Blue', hex: '#66b2ff' },
      { name: 'Light Gray', hex: '#e0e0e0' },
      { name: 'White', hex: '#ffffff' },
    ],
    sites: [
      {
        name: 'Public Website',
        url: 'https://azulpoolservices.com',
        type: 'public',
        framework: 'webflow',
        isPrimary: true,
      },
    ],
    technologies: ['NextJS', 'React', 'TypeScript', 'Vercel', 'Cursor', 'GitHub', 'Adobe Illustrator', 'Adobe Photoshop', 'Grok Imagine' ],
    year: 2025,
    category: 'Service Business',
  },
  {
    slug: 'bridgehead-capital',
    title: 'Bridge Head Capital Partners',
    description: 'Investment firm website showcasing portfolio and services.',
    overview: `The Bridgehead Capital Partners project involved designing and developing a professional, investor-focused website to establish a credible and polished digital presence for the firm. I led the project end to end, handling both the design and implementation in Webflow. The site was built with a clean, conservative visual style appropriate for private capital markets, emphasizing clarity, trust, and ease of navigation. I structured the content to clearly communicate the firm’s positioning, investment philosophy, and leadership, while ensuring the site was fully responsive, performant, and easy for the client to maintain after handoff.`,
    services: ['Design & Dev', 'Launch Support', 'Motion & Media'],
    sites: [
      {
        name: 'Public Website',
        url: 'https://bridgeheadcapitalpartners.com',
        type: 'public',
        framework: 'nextjs',
        isPrimary: true,
      },
    ],
    technologies: ['Webflow', 'Adobe Illustrator', 'Adobe Photoshop' ],
    year: 2023,
    category: 'Finance',
  },
  {
    slug: 'cupcake-dream-shop',
    title: 'The Cupcake Dream Shop',
    description: 'Delicious cupcakes and sweet treats for every occasion.',
    overview: `The Cupcake Dream Shop project involved designing and developing a modern, customer-facing website for a specialty bakery brand, along with creating a new logo and defining the brand color palette. I handled the project end to end, developing a visually engaging and approachable brand identity that reflected the playful, welcoming nature of the business. The website was built using Next.js, with a focus on performance, responsiveness, and clean component-based architecture. I translated the new logo and brand colors into a cohesive digital experience, structured content to highlight products and the business story, and ensured the site delivered a consistent, polished experience across devices.`,
    services: ['Brand Identity', 'Design & Dev', 'Launch Support', 'Motion & Media'],
    combinationMark: '/cupcake-dream-shop-logo.svg',
    brandColors: [
        { name: 'Rose', hex: '#e8234e' },
        { name: 'Gray', hex: '#e6e6e6' },
        { name: 'White', hex: '#FFFFFF' },
    ],
    sites: [
      {
        name: 'Public Website',
        url: 'https://thecupcakedreamshop.com',
        type: 'public',
        framework: 'builder',
        isPrimary: true,
      },
    ],
    technologies: ['NextJS', 'React', 'TypeScript', 'Vercel', 'Cursor', 'GitHub', 'Adobe Illustrator', 'Adobe Photoshop', 'AI Generated Images' ],
    year: 2023,
    category: 'Retail',
  },
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

// Helper function to get all project slugs (for static generation)
export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
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

