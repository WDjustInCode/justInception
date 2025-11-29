// 1. SITE TYPES (base site pricing)

const SITE_TYPES = {
  billboard: {
    label: "Billboard / one-page site",
    basePrice: 500,
    basePages: 1,
    extraPagePrice: 150,   // extra NEW page beyond base
    updatePagePrice: 90,   // extra UPDATED page beyond base (rebuild only)
  },
  serviceBusiness: {
    label: "Service business",
    basePrice: 900,
    basePages: 5,
    extraPagePrice: 150,
    updatePagePrice: 100,
  },
  retail: {
    label: "Retail / Shop (non-sales)",
    basePrice: 900,
    basePages: 5,
    extraPagePrice: 150,
    updatePagePrice: 100,
    baseProductsIncluded: 20,
    extraProductPrice: 20,
  },
  retailShipping: {
    label: "Retail / Shop (sales & shipping)",
    basePrice: 1500,
    basePages: 5,
    extraPagePrice: 150,
    updatePagePrice: 100,
    baseProductsIncluded: 20,
    extraProductPrice: 20,
  },
  educational: {
    label: "Educational business",
    basePrice: 1500,
    basePages: 6,
    extraPagePrice: 150,
    updatePagePrice: 100,
  },
  creative: {
    label: "Creative business",
    basePrice: 900,
    basePages: 6,
    extraPagePrice: 150,
    updatePagePrice: 100,
    baseProjectsIncluded: 6,
    extraProjectPrice: 60,
  },
  events: {
    label: "Events (wedding, anniversary, etc.)",
    basePrice: 750,
    basePages: 4,
    extraPagePrice: 150,
    updatePagePrice: 100,
  },
  webapp: {
    label: "Web app / SaaS (Next.js)",
    basePrice: 3000,
    basePages: 8,
    extraPagePrice: 150,
    updatePagePrice: 100,
  },
};

// 2. PLATFORM ADJUSTMENTS (base site, NON lead-gen)

const PLATFORM_ADJUSTMENTS = {
  builder: {   // GoDaddy, Wix, Squarespace, etc.
    label: "Builder (GoDaddy / Wix / similar)",
    adjustment: 0,
  },
  webflow: {
    label: "Webflow",
    adjustment: 400,
  },
  nextjs: {
    label: "Custom Next.js",
    adjustment: 1500,
  },
};

// 3. PAGE SECTIONS (for deriving page count from selections)

export const PAGE_SECTIONS = {
  home: {
    label: "Home page",
    pageCount: 1,
    alwaysIncluded: true,
  },
  about: {
    label: "About page",
    pageCount: 1,
  },
  services: {
    label: "Services / Products listing page",
    pageCount: 1,
  },
  serviceDetails: {
    label: "Individual service detail pages",
    pageCount: 0, // Will be calculated from count
    requiresCount: true,
  },
  products: {
    label: "Products listing page",
    pageCount: 1,
  },
  productDetails: {
    label: "Individual product detail pages",
    pageCount: 0, // Will be calculated from count
    requiresCount: true,
  },
  shipping: {
    label: "Shipping overview page",
    pageCount: 1,
  },
  locations: {
    label: "Store locations page",
    pageCount: 1,
  },
  lookbook: {
    label: "Lookbook / Gallery page",
    pageCount: 1,
  },
  giftCards: {
    label: "Gift cards page",
    pageCount: 1,
  },
  contact: {
    label: "Contact page",
    pageCount: 1,
  },
  howItWorks: {
    label: "How it works / Process page",
    pageCount: 1,
  },
  blog: {
    label: "Blog / News section",
    pageCount: 2, // Listing + template for posts
  },
  portfolio: {
    label: "Portfolio / Work showcase",
    pageCount: 1,
  },
  caseStudies: {
    label: "Case studies / Project details",
    pageCount: 0, // Will be calculated from count
    requiresCount: true,
  },
  faq: {
    label: "FAQ page",
    pageCount: 1,
  },
  resources: {
    label: "Resources / Downloads section",
    pageCount: 1,
  },
  courses: {
    label: "Course / Learning track pages",
    pageCount: 0, // Will be calculated from count
    requiresCount: true,
  },
  events: {
    label: "Events page",
    pageCount: 1,
  },
  instructors: {
    label: "Instructors / Team page",
    pageCount: 1,
  },
  process: {
    label: "Process / Methodology page",
    pageCount: 1,
  },
  press: {
    label: "Press / Awards page",
    pageCount: 1,
  },
  schedule: {
    label: "Schedule / Timeline page",
    pageCount: 1,
  },
  speakers: {
    label: "Speakers page",
    pageCount: 1,
  },
  tickets: {
    label: "Tickets / Registration page",
    pageCount: 1,
  },
  sponsors: {
    label: "Sponsors page",
    pageCount: 1,
  },
  venue: {
    label: "Venue / Location page",
    pageCount: 1,
  },
  pastEvents: {
    label: "Past events / Archive page",
    pageCount: 1,
  },
  features: {
    label: "Features page",
    pageCount: 1,
  },
  docs: {
    label: "Documentation / API docs",
    pageCount: 1,
  },
  support: {
    label: "Support / Help center",
    pageCount: 1,
  },
  changelog: {
    label: "Changelog / Updates page",
    pageCount: 1,
  },
  pricing: {
    label: "Pricing page",
    pageCount: 1,
  },
  login: {
    label: "Login page",
    pageCount: 1,
  },
  signup: {
    label: "Sign up page",
    pageCount: 1,
  },
  thankYou: {
    label: "Thank you / Confirmation page",
    pageCount: 1,
  },
  legal: {
    label: "Legal pages (Privacy Policy, Terms, etc.)",
    pageCount: 2,
  },
  privacy: {
    label: "Privacy Policy page",
    pageCount: 1,
  },
  terms: {
    label: "Terms of Service page",
    pageCount: 1,
  },
  cookiePolicy: {
    label: "Cookie Policy page",
    pageCount: 1,
  },
  shippingPolicy: {
    label: "Shipping Policy page",
    pageCount: 1,
  },
  returnsPolicy: {
    label: "Returns / Refund Policy page",
    pageCount: 1,
  },
};

// 3.5. DEFAULT SITEMAPS by site type

export const DEFAULT_SITEMAPS = {
  billboard: {
    label: "Billboard / One-pager",
    core: [
      "home",             // Hero, about, highlights, CTA, testimonials section, contact block
    ],
    recommended: [
      "thankYou",
    ],
    optional: [
      "privacy",
    ],
  },
  serviceBusiness: {
    label: "Service Business",
    core: [
      "home",
      "about",
      "services",         // Overview of what they offer (one page)
      "howItWorks",       // Step-by-step explanation (trust builder)
      "contact",
    ],
    recommended: [
      "serviceDetails",   // Template page for individual services (SEO-friendly)
      "faq",
      "resources",        // Guides, PDFs, downloads
    ],
    optional: [
      "blog",
      "privacy",
      "terms",
    ],
  },
  retail: {
    label: "Retail / Shop",
    core: [
      "home",        // Hero, featured products, highlights
      "about",       // Brand story
      "products",    // Product listing with built-in categories/filters
      "contact",     // Store info, support, map
      "legal",       // Privacy, terms hub
    ],
    recommended: [
      "productDetails", // Template for individual product pages
      "faq",            // Product, sizing, store Q&A
      "locations",      // Only if multiple storefronts
    ],
    optional: [
      "blog",
      "lookbook",
      "giftCards",
      "shippingPolicy",
      "returnsPolicy",
      "privacy",
      "terms",
    ],
  },
  retailShipping: {
    label: "Retail + Shipping",
    core: [
      "home",        // Retail hero, featured items, shipping tease
      "about",
      "products",    // Listing with categories inside
      "contact",
      "legal",
    ],
    recommended: [
      "productDetails",
      "faq",
      "howItWorks",      // If shipping/packing has steps (optional)
      "locations",
    ],
    optional: [
      "blog",
      "lookbook",
      "giftCards",
      "shippingPolicy",  // Detailed policy (separate from "shipping overview")
      "returnsPolicy",
      "privacy",
      "terms",
    ],
  },
  educational: {
    label: "Educational / Info Resource",
    core: [
      "home",
      "about",
      "resources",        // Article hub / guides / tools
      "contact",
    ],
    recommended: [
      "blog",
      "courses",          // Curriculum, learning tracks, or videos
      "faq",
    ],
    optional: [
      "events",
      "instructors",
      "privacy",
      "terms",
    ],
  },
  creative: {
    label: "Creative / Portfolio",
    core: [
      "home",
      "about",
      "portfolio",        // Gallery / work grid
      "caseStudies",      // Depth stories (SEO content)
      "contact",
    ],
    recommended: [
      "services",         // Creative offerings: branding, UX/UI, etc.
      "process",
      "faq",
    ],
    optional: [
      "blog",
      "press",            // Awards, features
      "privacy",
      "terms",
    ],
  },
  events: {
    label: "Events / Conferences / Gatherings",
    core: [
      "home",
      "about",
      "contact",
    ],
    recommended: [
      "schedule",
      "speakers",
      "tickets",
      "faq",
    ],
    optional: [
      "sponsors",
      "venue",
      "pastEvents",
      "privacy",
      "terms",
    ],
  },
  webapp: {
    label: "Web App / SaaS",
    core: [
      "home",             // Marketing page
      "about",
      "contact",
      "resources",        // Docs / help / reference materials
      "legal",            // Combined legal hub
    ],
    recommended: [
      "features",         // What the app does
      "docs",             // API docs / how-to guides
      "support",          // Help center
      "changelog",        // Updates
    ],
    optional: [
      "pricing",          // Only if relevant
      "login",            // May be handled by app shell
      "signup",
      "privacy",
      "terms",
      "cookiePolicy",
    ],
  },
};

// 4. CONTENT HANDLING (per page)

const CONTENT_OPTIONS = {
  client: {
    label: "Client provides final copy & assets",
    perPage: 0,
  },
  editing: {
    label: "Client drafts, Justin edits & formats",
    perPage: 50,
  },
  full: {
    label: "Justin creates copy & source images",
    perPage: 100,
  },
};

// 5. INTEGRATIONS (flat fees)

const INTEGRATIONS = {
  ga4: {
    label: "Google Analytics 4 + Search Console + XML sitemap",
    price: 150,
  },
  socialPixels: {
    label: "Social pixels (Meta, LinkedIn, etc.)",
    price: 150,
  },
  emailMarketing: {
    label: "Email marketing integration",
    price: 250,
  },
  crm: {
    label: "CRM integration",
    price: 250,
  },
  paymentGateway: {
    label: "Payment gateway setup (Stripe / PayPal)",
    price: 250,
  },
  booking: {
    label: "Booking / scheduling integration",
    price: 250,
  },
  blog: {
    label: "Content Management System (CMS) / Blog admin",
    price: 250,
  },
  seo: {
    label: "SEO essentials (titles/meta/schema)",
    price: 150,
  },
};

// 5.5. BRAND KIT & LOGO DESIGNs

const BRAND_KIT = {
  label: "Logo + Brand Kit Design",
  price: 1000,
};

// 6. WEBAPP FEATURE COMPLEXITY ADD-ON

const FEATURE_COMPLEXITY = {
  low:    { label: "Basic app (auth + basic pages)",           adjustment: 0 },
  medium: { label: "Moderate app (dashboards, roles, forms)",  adjustment: 1500 },
  high:   { label: "Complex app (multi-tenant / realtime)",    adjustment: 3000 },
};

// 7. LEAD GENERATOR: BASE BUILD COST (independent of platform)

const LEAD_GEN = {
  none: {
    label: "No dedicated lead generator",
    baseBuild: 0,
  },
  simple: {
    label: "Simple lead form (single step)",
    baseBuild: 50,
  },
  multistep: {
    label: "Multi-step quiz / form",
    baseBuild: 100,
  },
  calculator: {
    label: "Interactive quote calculator",
    baseBuild: 600,  // e.g., Azul / JustInception style
  },
  advanced: {
    label: "Advanced lead app (custom flows, logic, storage)",
    baseBuild: 1200,
  },
};

// 8. LEAD GENERATOR: PLATFORM INTEGRATION ADJUSTMENT

// Note: Webflow and GoDaddy/builder are intentionally priced the same.

const LEAD_GEN_PLATFORM_ADJUSTMENTS = {
  nextjs: -200,  // cheaper as an add-on inside an app you're already building
  webflow: 200,  // external mini-app + hosting + embed
  builder: 200,  // same workload as Webflow
};

// 9. TIMELINE MULTIPLIERS

const TIMELINE_MULTIPLIERS = {
  standard: { label: "Standard timeline", multiplier: 1.0 },
  rush25:   { label: "Rush (+25%)",       multiplier: 1.25 },
  rush50:   { label: "Super rush (+50%)", multiplier: 1.5  },
};

// Helper function to calculate page count from selections
export function calculatePageCountFromSelections(
  selectedPages: (keyof typeof PAGE_SECTIONS)[],
  serviceDetailsCount?: number,
  caseStudyCount?: number,
  courseCount?: number,
  productDetailsCount?: number
): number {
  let total = 0;
  
  for (const pageKey of selectedPages) {
    const page = PAGE_SECTIONS[pageKey];
    if (!page) continue;
    
    // Check if page requires a count
    const requiresCount = 'requiresCount' in page && page.requiresCount;
    
    if (requiresCount) {
      if (pageKey === 'serviceDetails' && serviceDetailsCount) {
        total += serviceDetailsCount;
      } else if (pageKey === 'caseStudies' && caseStudyCount) {
        total += caseStudyCount;
      } else if (pageKey === 'courses' && courseCount) {
        total += courseCount;
      } else if (pageKey === 'productDetails' && productDetailsCount) {
        total += productDetailsCount;
      }
    } else {
      total += page.pageCount;
    }
  }
  
  // Always include home page
  if (!selectedPages.includes('home')) {
    total += PAGE_SECTIONS.home.pageCount;
  }
  
  return total;
}

// Input shape for form (platform will be determined automatically)

export type QuoteFormInput = {
  siteType?: keyof typeof SITE_TYPES;
  timeline: keyof typeof TIMELINE_MULTIPLIERS;
  isRebuild: boolean;
  // Pages - now using selections instead of direct counts
  selectedPages?: (keyof typeof PAGE_SECTIONS)[];  // for new builds
  selectedPagesToUpdate?: (keyof typeof PAGE_SECTIONS)[];  // for rebuilds
  selectedPagesToAdd?: (keyof typeof PAGE_SECTIONS)[];  // for rebuilds
  serviceDetailsCount?: number;  // if serviceDetails is selected
  caseStudyCount?: number;  // if caseStudies is selected
  courseCount?: number;  // if courses is selected
  productDetailsCount?: number;  // if productDetails is selected
  // Legacy support - can still accept direct counts if needed
  totalPages?: number;     // used when isRebuild === false (calculated from selections if not provided)
  updatedPages?: number;   // used when isRebuild === true (calculated from selections if not provided)
  newPages?: number;       // used when isRebuild === true (calculated from selections if not provided)
  // Content
  contentHandling: keyof typeof CONTENT_OPTIONS;
  // Type-specific inputs
  projectCount?: number;   // portfolio only
  productCount?: number;   // ecommerce only
  featureComplexity?: keyof typeof FEATURE_COMPLEXITY; // webapp only
  // Lead generator
  leadGenType: keyof typeof LEAD_GEN;
  // Integrations
  integrations: (keyof typeof INTEGRATIONS)[];
  // Platform determination helpers
  wantsCustomAnimations?: boolean;  // for determining if Webflow needed
  isBudgetConscious?: boolean;      // for determining if Builder should be used
  // Additional services
  wantsBrandKit?: boolean;          // Logo + Brand Kit Design
};

// Internal input shape (with platform)
export type QuoteInput = QuoteFormInput & {
  platform: keyof typeof PLATFORM_ADJUSTMENTS;
};

// Platform determination logic
// Rules:
// - Next.js if: webapp OR calculator lead gen OR complex system
// - Builder if: budget-conscious AND simple site
// - Webflow: default/standard
// - Webflow + Next.js: custom animations + calculator (special case - we'll use Next.js for the calculator part)
export function determinePlatform(input: QuoteFormInput): keyof typeof PLATFORM_ADJUSTMENTS {
  // If no site type, default to webflow (won't be used but needed for type safety)
  if (!input.siteType) {
    return "webflow";
  }

  // Webapp always uses Next.js
  if (input.siteType === "webapp") {
    return "nextjs";
  }

  // Hybrid case: Calculator + Custom Animations = Webflow site with Next.js calculator app
  // The calculator will be priced as Next.js even though main platform is Webflow
  if (input.leadGenType === "calculator" && input.wantsCustomAnimations) {
    return "webflow";
  }

  // Calculator lead gen requires Next.js (when no animations)
  if (input.leadGenType === "calculator") {
    return "nextjs";
  }

  // Budget-conscious + simple site = Builder (unless they want custom animations)
  if (input.isBudgetConscious && !input.wantsCustomAnimations && (input.siteType === "billboard" || input.siteType === "serviceBusiness" || input.siteType === "events")) {
    return "builder";
  }

  // Custom animations prefer Webflow (better animation capabilities)
  if (input.wantsCustomAnimations) {
    return "webflow";
  }

  // Default: Webflow (standard platform)
  return "webflow";
}

export type QuoteBreakdownItem = {
  label: string;
  amount: number;
};

export type QuoteResult = {
  total: number;          // final total after timeline multiplier
  breakdown: QuoteBreakdownItem[];      // array of line items
  meta: {
    totalPages: number;
    basePagesIncluded: number;
    freeNew: number;
    freeUpdated: number;
    extraNew: number;
    extraUpdated: number;
    siteTypeLabel: string;
    platformLabel: string;
    timelineLabel: string;
  };
};

// Calculation flow

export function calculateQuote(input: QuoteInput | QuoteFormInput): QuoteResult {
  // Determine platform if not provided
  const platform = 'platform' in input ? input.platform : determinePlatform(input);
  const fullInput: QuoteInput = {
    ...input,
    platform,
  };
  
  return calculateQuoteInternal(fullInput);
}

function calculateQuoteInternal(input: QuoteInput): QuoteResult {
  let total = 0;
  const breakdown: QuoteBreakdownItem[] = [];

  // Initialize variables for meta data
  let totalPages = 0;
  let basePagesIncluded = 0;
  let freeNew = 0;
  let freeUpdated = 0;
  let extraNew = 0;
  let extraUpdated = 0;

  // ---- 1. BASE SITE PRICE (site type + platform) ----
  // Only calculate if site type is provided
  if (input.siteType) {
    const site     = SITE_TYPES[input.siteType];
    const platform = PLATFORM_ADJUSTMENTS[input.platform];
    const content  = CONTENT_OPTIONS[input.contentHandling];
    const baseSitePrice = site.basePrice + platform.adjustment;
    total += baseSitePrice;
    breakdown.push({
      label: `${site.label} · ${platform.label}`,
      amount: baseSitePrice,
    });

    // ---- 2. PAGES: NEW BUILD vs REBUILD ----
    let updatedPages = 0;
    let newPages = 0;
    
    if (!input.isRebuild) {
      // New build: calculate from selected pages if provided, otherwise use direct count
      if (input.selectedPages && input.selectedPages.length > 0) {
        totalPages = calculatePageCountFromSelections(
          input.selectedPages,
          input.serviceDetailsCount,
          input.caseStudyCount,
          input.courseCount,
          input.productDetailsCount
        );
      } else {
        totalPages = input.totalPages ?? 0;
      }
      newPages   = totalPages;
      updatedPages = 0;
    } else {
      // Rebuild: calculate from selected pages if provided
      if (input.selectedPagesToUpdate && input.selectedPagesToUpdate.length > 0) {
        updatedPages = calculatePageCountFromSelections(
          input.selectedPagesToUpdate,
          input.serviceDetailsCount,
          input.caseStudyCount,
          input.courseCount,
          input.productDetailsCount
        );
      } else {
        updatedPages = input.updatedPages ?? 0;
      }
      
      if (input.selectedPagesToAdd && input.selectedPagesToAdd.length > 0) {
        newPages = calculatePageCountFromSelections(
          input.selectedPagesToAdd,
          input.serviceDetailsCount,
          input.caseStudyCount,
          input.courseCount,
          input.productDetailsCount
        );
      } else {
        newPages = input.newPages ?? 0;
      }
      
      totalPages = updatedPages + newPages;
    }

    basePagesIncluded = site.basePages ?? 0;
    if (input.isRebuild) {
      let remainingBase = basePagesIncluded;
      // base pages cover UPDATED pages first
      freeUpdated = Math.min(updatedPages, remainingBase);
      remainingBase -= freeUpdated;
      // remaining base pages cover NEW pages
      freeNew = Math.min(newPages, remainingBase);
      remainingBase -= freeNew;
      extraUpdated = Math.max(updatedPages - freeUpdated, 0);
      extraNew     = Math.max(newPages - freeNew, 0);
    } else {
      freeNew    = Math.min(newPages, basePagesIncluded);
      extraNew   = Math.max(newPages - freeNew, 0);
      freeUpdated  = 0;
      extraUpdated = 0;
    }

      // Charge for additional NEW pages beyond base
      if (extraNew > 0 && site.extraPagePrice) {
        const cost = extraNew * site.extraPagePrice;
        total += cost;
        breakdown.push({
          label: `Additional new pages (${extraNew} × $${site.extraPagePrice})`,
          amount: cost,
        });
      }

      // Charge for additional UPDATED pages beyond base
      if (extraUpdated > 0 && site.updatePagePrice) {
        const cost = extraUpdated * site.updatePagePrice;
        total += cost;
        breakdown.push({
          label: `Updated pages beyond base (${extraUpdated} × $${site.updatePagePrice})`,
          amount: cost,
        });
      }

      // ---- 3. CONTENT COST (per total page count) ----
      if (content.perPage > 0 && totalPages > 0) {
        const contentCost = content.perPage * totalPages;
        total += contentCost;
        breakdown.push({
          label: `Content: ${content.label} (${totalPages} × $${content.perPage})`,
          amount: contentCost,
        });
      }

      // ---- 4. TYPE-SPECIFIC EXTRAS ----
      // Creative business: extra projects beyond base
      if (input.siteType === "creative") {
        const creativeSite = site as typeof SITE_TYPES.creative;
        const count = input.projectCount ?? 0;
        const baseProjects = creativeSite.baseProjectsIncluded ?? 0;
        const extraProjects = Math.max(count - baseProjects, 0);
        if (extraProjects > 0 && creativeSite.extraProjectPrice) {
          const projectCost = extraProjects * creativeSite.extraProjectPrice;
          total += projectCost;
          breakdown.push({
            label: `Extra portfolio projects (${extraProjects} × $${creativeSite.extraProjectPrice})`,
            amount: projectCost,
          });
        }
      }

      // Retail businesses: extra products beyond base
      if (input.siteType === "retail" || input.siteType === "retailShipping") {
        const retailSite = site as typeof SITE_TYPES.retail | typeof SITE_TYPES.retailShipping;
        const count = input.productCount ?? 0;
        const baseProducts = retailSite.baseProductsIncluded ?? 0;
        const extraProducts = Math.max(count - baseProducts, 0);
        if (extraProducts > 0 && retailSite.extraProductPrice) {
          const productCost = extraProducts * retailSite.extraProductPrice;
          total += productCost;
          breakdown.push({
            label: `Extra products (${extraProducts} × $${retailSite.extraProductPrice})`,
            amount: productCost,
          });
        }
      }

      // Web app: feature complexity add-on
      if (input.siteType === "webapp") {
        const fc = FEATURE_COMPLEXITY[input.featureComplexity ?? "medium"];
        if (fc && fc.adjustment > 0) {
          total += fc.adjustment;
          breakdown.push({
            label: `App feature complexity: ${fc.label}`,
            amount: fc.adjustment,
          });
        }
      }

      // ---- 5. LEAD GENERATOR (baseBuild + platform adjustment) ----
      const leadGen = LEAD_GEN[input.leadGenType];
      if (leadGen && leadGen.baseBuild > 0) {
        // Hybrid case: Calculator + Animations = Webflow site with Next.js calculator app
        // Use Next.js pricing for the calculator even though main platform is Webflow
        const isHybridCase = 
          input.leadGenType === "calculator" && input.wantsCustomAnimations && input.platform === "webflow";
        const calculatorPlatform = isHybridCase ? "nextjs" : input.platform;
        
        const lgAdj =
          LEAD_GEN_PLATFORM_ADJUSTMENTS[calculatorPlatform] ?? 0;
        const leadGenCost = Math.max(0, leadGen.baseBuild + lgAdj);
        if (leadGenCost > 0) {
          total += leadGenCost;
          breakdown.push({
            label: isHybridCase 
              ? `Lead generator: ${leadGen.label} (Next.js app embedded in Webflow)`
              : `Lead generator: ${leadGen.label}`,
            amount: leadGenCost,
          });
        }
      }

      // ---- 6. INTEGRATIONS (flat fees) ----
      for (const key of input.integrations) {
        const integ = INTEGRATIONS[key];
        if (!integ) continue;
        total += integ.price;
        breakdown.push({
          label: integ.label,
          amount: integ.price,
        });
      }
    }

  // ---- 6.5. BRAND KIT & LOGO DESIGN ----
  if (input.wantsBrandKit) {
    total += BRAND_KIT.price;
    breakdown.push({
      label: BRAND_KIT.label,
      amount: BRAND_KIT.price,
    });
  }

  // ---- 7. TIMELINE MULTIPLIER (rush pricing) ----
  const timeline = TIMELINE_MULTIPLIERS[input.timeline];
  const preTimelineTotal = total;
  const multiplier = timeline.multiplier;
  if (multiplier !== 1) {
    const finalTotal = Math.round(preTimelineTotal * multiplier);
    const surcharge = finalTotal - preTimelineTotal;
    total = finalTotal;
    breakdown.push({
      label: `Timeline surcharge (${timeline.label})`,
      amount: surcharge,
    });
  }

  // Prepare meta data
  let siteTypeLabel = "None";
  let platformLabel = "N/A";

  if (input.siteType) {
    const site = SITE_TYPES[input.siteType];
    const platform = PLATFORM_ADJUSTMENTS[input.platform];
    siteTypeLabel = site.label;
    platformLabel = platform.label;
  }

  return {
    total,          // final total after timeline multiplier
    breakdown,      // array of line items
    meta: {
      totalPages,
      basePagesIncluded,
      freeNew,
      freeUpdated,
      extraNew,
      extraUpdated,
      siteTypeLabel,
      platformLabel,
      timelineLabel: timeline.label,
    },
  };
}

// Format quote for display
export function formatQuote(result: QuoteResult): string {
  return `$${result.total.toLocaleString()}`;
}

// Export constants for use in forms/UI
export { SITE_TYPES, PLATFORM_ADJUSTMENTS, CONTENT_OPTIONS, INTEGRATIONS, FEATURE_COMPLEXITY, LEAD_GEN, TIMELINE_MULTIPLIERS, LEAD_GEN_PLATFORM_ADJUSTMENTS, BRAND_KIT };
