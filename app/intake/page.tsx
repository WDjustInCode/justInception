"use client";

import { useState } from "react";
import { SITE_TYPES, CONTENT_OPTIONS, LEAD_GEN, INTEGRATIONS, FEATURE_COMPLEXITY, TIMELINE_MULTIPLIERS, PAGE_SECTIONS, DEFAULT_SITEMAPS, calculatePageCountFromSelections, BRAND_KIT, type QuoteFormInput, type QuoteResult } from "@/lib/quote";

type FormData = {
  // Contact info
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  // Quote data
  siteType: keyof typeof SITE_TYPES | "";
  timeline: keyof typeof TIMELINE_MULTIPLIERS;
  isRebuild: boolean;
  selectedPages: (keyof typeof PAGE_SECTIONS)[];
  selectedPagesToUpdate: (keyof typeof PAGE_SECTIONS)[];
  selectedPagesToAdd: (keyof typeof PAGE_SECTIONS)[];
  serviceDetailsCount: string;
  caseStudyCount: string;
  courseCount: string;
  productDetailsCount: string;
  contentHandling: keyof typeof CONTENT_OPTIONS;
  projectCount: string;
  productCount: string;
  featureComplexity: keyof typeof FEATURE_COMPLEXITY | "";
  leadGenType: keyof typeof LEAD_GEN;
  integrations: (keyof typeof INTEGRATIONS)[];
  wantsCustomAnimations: boolean;
  isBudgetConscious: boolean;
  wantsBrandKit: boolean;
  // Additional
  launchDate: string;
  extraNotes: string;
};

// Default page selections by site type (core + recommended)
function getDefaultPagesForSiteType(siteType: keyof typeof SITE_TYPES | ""): (keyof typeof PAGE_SECTIONS)[] {
  if (!siteType) return ["home"];
  
  const sitemap = DEFAULT_SITEMAPS[siteType];
  if (!sitemap) return ["home"];
  
  // Return core + recommended pages
  return [...sitemap.core, ...sitemap.recommended] as (keyof typeof PAGE_SECTIONS)[];
}

const initialData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  siteType: "",
  timeline: "standard",
  isRebuild: false,
  selectedPages: ["home"],
  selectedPagesToUpdate: [],
  selectedPagesToAdd: [],
  serviceDetailsCount: "",
  caseStudyCount: "",
  courseCount: "",
  productDetailsCount: "",
  contentHandling: "client",
  projectCount: "",
  productCount: "",
  featureComplexity: "",
  leadGenType: "none",
  integrations: [],
  wantsCustomAnimations: false,
  isBudgetConscious: false,
  wantsBrandKit: false,
  launchDate: "",
  extraNotes: "",
};

export default function IntakeFormPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('intakeFormData');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Ensure arrays are always defined
          const loadedData = {
            ...initialData,
            ...parsed,
            selectedPages: parsed.selectedPages || initialData.selectedPages,
            selectedPagesToUpdate: parsed.selectedPagesToUpdate || initialData.selectedPagesToUpdate,
            selectedPagesToAdd: parsed.selectedPagesToAdd || initialData.selectedPagesToAdd,
            integrations: parsed.integrations || initialData.integrations,
          };
          
          // If siteType is set but no pages selected (and not a rebuild), set defaults
          if (loadedData.siteType && !loadedData.isRebuild && (!loadedData.selectedPages || loadedData.selectedPages.length === 0)) {
            loadedData.selectedPages = getDefaultPagesForSiteType(loadedData.siteType as keyof typeof SITE_TYPES) as (keyof typeof PAGE_SECTIONS)[];
          }
          
          return loadedData;
        } catch {
          return initialData;
        }
      }
    }
    return initialData;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => {
      const newData = { ...prev, [key]: value };
      
      // Auto-populate default pages when site type changes (only for new builds)
      if (key === "siteType" && !prev.isRebuild && value) {
        const defaultPages = getDefaultPagesForSiteType(value as keyof typeof SITE_TYPES) as (keyof typeof PAGE_SECTIONS)[];
        newData.selectedPages = defaultPages;
      }
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('intakeFormData', JSON.stringify(newData));
      }
      return newData;
    });
  }

  function toggleIntegration(key: keyof typeof INTEGRATIONS) {
    setData((prev) => {
      const exists = prev.integrations.includes(key);
      const newData = {
        ...prev,
        integrations: exists
          ? prev.integrations.filter((k) => k !== key)
          : [...prev.integrations, key],
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('intakeFormData', JSON.stringify(newData));
      }
      return newData;
    });
  }

  function togglePage(pageKey: keyof typeof PAGE_SECTIONS, isRebuild: boolean, isUpdate: boolean) {
    setData((prev) => {
      let targetArray: (keyof typeof PAGE_SECTIONS)[];
      if (isRebuild) {
        targetArray = isUpdate ? (prev.selectedPagesToUpdate || []) : (prev.selectedPagesToAdd || []);
      } else {
        targetArray = prev.selectedPages || [];
      }
      
      const exists = targetArray.includes(pageKey);
      const newArray = exists
        ? targetArray.filter((k) => k !== pageKey)
        : [...targetArray, pageKey];
      
      const newData = {
        ...prev,
        ...(isRebuild
          ? isUpdate
            ? { selectedPagesToUpdate: newArray }
            : { selectedPagesToAdd: newArray }
          : { selectedPages: newArray }),
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('intakeFormData', JSON.stringify(newData));
      }
      return newData;
    });
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, 5));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare quote data
      const quoteData: QuoteFormInput = {
        siteType: data.siteType ? (data.siteType as keyof typeof SITE_TYPES) : undefined,
        timeline: data.timeline,
        isRebuild: data.isRebuild,
        selectedPages: data.isRebuild ? undefined : data.selectedPages,
        selectedPagesToUpdate: data.isRebuild ? data.selectedPagesToUpdate : undefined,
        selectedPagesToAdd: data.isRebuild ? data.selectedPagesToAdd : undefined,
        serviceDetailsCount: data.serviceDetailsCount ? parseInt(data.serviceDetailsCount) : undefined,
        caseStudyCount: data.caseStudyCount ? parseInt(data.caseStudyCount) : undefined,
        courseCount: data.courseCount ? parseInt(data.courseCount) : undefined,
        productDetailsCount: data.productDetailsCount ? parseInt(data.productDetailsCount) : undefined,
        contentHandling: data.contentHandling,
        projectCount: data.projectCount ? parseInt(data.projectCount) : undefined,
        productCount: data.productCount ? parseInt(data.productCount) : undefined,
        featureComplexity: data.featureComplexity ? (data.featureComplexity as keyof typeof FEATURE_COMPLEXITY) : undefined,
        leadGenType: data.leadGenType,
        integrations: data.integrations,
        wantsCustomAnimations: data.wantsCustomAnimations,
        isBudgetConscious: data.isBudgetConscious,
        wantsBrandKit: data.wantsBrandKit,
      };

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ...quoteData,
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const responseData = await res.json();
      if (responseData.quote?.breakdown) {
        setQuoteResult(responseData.quote.breakdown);
      }

      setSubmitted(true);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('intakeFormData');
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 md:p-12" style={{ backgroundColor: '#03040a' }}>
        <div className="max-w-3xl w-full rounded-3xl space-y-6" style={{ padding: '80px', backgroundColor: '#03040a', color: '#ffdd4f' }}>
          <div className="text-center">
            <div className="rounded-2xl flex items-center justify-center" style={{ width: '64px', height: '64px', margin: '0 auto 24px', backgroundColor: '#a29bfe' }}>
              <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: '#ffdd4f' }}>
              Thanks for sharing your project
            </h1>
            <p className="leading-relaxed mb-6" style={{ color: '#ffdd4f', opacity: 0.8 }}>
              I'll review your submission and get back to you with next steps.
            </p>
          </div>

          {/* Pricing Estimate */}
          {quoteResult && (
            <div className="text-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 221, 79, 0.05)', borderColor: '#ffdd4f', borderWidth: '1px', padding: '12px' }}>
                <div className="space-y-3">
                    {quoteResult.breakdown.length === 0 && (
                        <div className="text-xs" style={{ color: '#ffdd4f', opacity: 0.7 }}>
                        No items selected.
                        </div>
                    )}
                    
                    {quoteResult.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between gap-6 py-2">
                            <span className="text-sm" style={{ color: '#ffdd4f' }}>{item.label}</span>
                            <span className="font-medium text-right" style={{ color: '#ffdd4f' }}>${item.amount.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 221, 79, 0.2)', paddingTop: '2px', marginTop: '2px', marginBottom: '12px' }}>
                    <div className="flex items-baseline justify-between">
                        <span style={{ color: '#ffdd4f' }}>Estimated Price</span>
                        <span className="font-medium text-right" style={{ color: '#ffdd4f' }}>${quoteResult.total.toLocaleString()}</span>
                    </div>
                </div>

                <div className="pt-2" style={{ borderTop: '1px solid rgba(255, 221, 79, 0.2)' }}>
                    <div className="text-xs leading-relaxed" style={{ color: '#ffdd4f', opacity: 0.8 }}>
                    <p>
                        <strong>Please note:</strong> This is an estimated price based on the information provided. The quote calculator isn't perfect and doesn't take into account any details mentioned in your extra notes. The final price could be more or less depending on specific requirements, but this estimate should give you a good ballpark figure.
                    </p>
                    </div>
                </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 md:p-12" style={{ backgroundColor: '#03040a' }}>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full rounded-3xl space-y-10"
        style={{ padding: '80px', backgroundColor: '#03040a', color: '#ffdd4f' }}
      >
        {/* Progress */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight" style={{ color: '#ffdd4f' }}>
            Website Project Intake
          </h1>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? '32px' : '24px',
                  backgroundColor: i === step ? '#a29bfe' : '#2d4e89'
                }}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Contact */}
        {step === 1 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#ffdd4f' }}>
                Contact & business details
              </h2>
              <p style={{ color: '#ffdd4f', opacity: 0.8 }}>
                So I know who I'm talking to and how to reach you.
              </p>
            </div>
            <div>
              <Field
                label="Your name & role"
                required
                value={data.name}
                onChange={(v) => update("name", v)}
              />
              <Field
                label="Company / organization name"
                required
                value={data.company}
                onChange={(v) => update("company", v)}
              />
              <Field
                label="Email"
                required
                type="email"
                value={data.email}
                onChange={(v) => update("email", v)}
              />
              <Field
                label="Phone / WhatsApp (optional)"
                value={data.phone}
                onChange={(v) => update("phone", v)}
              />
              <Field
                label="Existing website URL (if you have one)"
                value={data.website}
                onChange={(v) => update("website", v)}
              />
            </div>
          </section>
        )}

        {/* Step 2: Project Type & Scope */}
        {step === 2 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#ffdd4f' }}>
                Project type & scope
              </h2>
              <p style={{ color: '#ffdd4f', opacity: 0.8 }}>
                What we're building and how big it is.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  <input
                    type="checkbox"
                    checked={data.wantsBrandKit}
                    onChange={(e) => update("wantsBrandKit", e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  Logo + Brand Kit Design
                </label>
                <p className="text-xs mt-1 ml-6" style={{ color: '#ffdd4f', opacity: 0.7 }}>
                  You can choose this service independently or alongside a website project.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  Site type {!data.wantsBrandKit && <span className="text-red-500">*</span>}
                </label>
                <select
                  value={data.siteType}
                  onChange={(e) => update("siteType", e.target.value as keyof typeof SITE_TYPES)}
                  required={!data.wantsBrandKit}
                  className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
                  style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', padding: '12px 16px' }}
                >
                  <option value="" style={{ backgroundColor: '#03040a', color: '#ffdd4f' }}>{data.wantsBrandKit ? "No website needed" : "Select..."}</option>
                  {Object.entries(SITE_TYPES).map(([key, value]) => (
                    <option key={key} value={key} style={{ backgroundColor: '#03040a', color: '#ffdd4f' }}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  <input
                    type="checkbox"
                    checked={data.isRebuild}
                    onChange={(e) => {
                      const isRebuild = e.target.checked;
                      setData((prev) => {
                        const defaultPages = isRebuild 
                          ? [] 
                          : (prev.siteType 
                              ? getDefaultPagesForSiteType(prev.siteType as keyof typeof SITE_TYPES) 
                              : ["home"] as (keyof typeof PAGE_SECTIONS)[]);
                        const newData: FormData = {
                          ...prev,
                          isRebuild,
                          // If switching to rebuild, clear selectedPages
                          // If switching from rebuild, set default pages based on site type
                          selectedPages: defaultPages,
                          selectedPagesToUpdate: isRebuild ? [] : [],
                          selectedPagesToAdd: isRebuild ? [] : [],
                        };
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('intakeFormData', JSON.stringify(newData));
                        }
                        return newData;
                      });
                    }}
                    style={{ marginRight: '8px' }}
                  />
                  This is a rebuild/redesign of an existing site
                </label>
              </div>

              {!data.isRebuild && data.siteType ? (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                    Pages & sections needed <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs mb-3" style={{ color: '#ffdd4f', opacity: 0.7 }}>
                    Core and recommended pages are pre-selected, but you can remove any you don't need. Optional pages can be added.
                  </p>
                  
                  {(() => {
                    const sitemap = DEFAULT_SITEMAPS[data.siteType as keyof typeof DEFAULT_SITEMAPS];
                    if (!sitemap) return null;
                    
                    const selected = data.selectedPages || [];
                    const core = sitemap.core || [];
                    const recommended = sitemap.recommended || [];
                    const optional = sitemap.optional || [];
                    
                    return (
                      <>
                        {/* Core Pages */}
                        {core.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2" style={{ color: '#ffdd4f' }}>Core Pages</h4>
                            <div className="flex flex-wrap gap-2">
                              {core.map((pageKey) => {
                                const page = PAGE_SECTIONS[pageKey as keyof typeof PAGE_SECTIONS];
                                if (!page) return null;
                                const active = selected.includes(pageKey as keyof typeof PAGE_SECTIONS);
                                return (
                                  <button
                                    type="button"
                                    key={pageKey}
                                    onClick={() => togglePage(pageKey as keyof typeof PAGE_SECTIONS, false, false)}
                                    className="rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
                                    style={{
                                      borderWidth: '1px',
                                      borderColor: active ? '#a29bfe' : '#ffdd4f',
                                      backgroundColor: active ? '#a29bfe' : 'transparent',
                                      color: active ? 'white' : '#ffdd4f',
                                      padding: '8px 16px',
                                      marginBottom: '10px'
                                    }}
                                  >
                                    {page.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Recommended Pages */}
                        {recommended.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2" style={{ color: '#ffdd4f' }}>Recommended (pre-selected)</h4>
                            <div className="flex flex-wrap gap-2">
                              {recommended.map((pageKey) => {
                                const page = PAGE_SECTIONS[pageKey as keyof typeof PAGE_SECTIONS];
                                if (!page) return null;
                                const active = selected.includes(pageKey as keyof typeof PAGE_SECTIONS);
                                return (
                                  <button
                                    type="button"
                                    key={pageKey}
                                    onClick={() => togglePage(pageKey as keyof typeof PAGE_SECTIONS, false, false)}
                                    className="rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
                                    style={{
                                      borderWidth: '1px',
                                      borderColor: active ? '#a29bfe' : '#ffdd4f',
                                      backgroundColor: active ? '#a29bfe' : 'transparent',
                                      color: active ? 'white' : '#ffdd4f',
                                      padding: '8px 16px',
                                      marginBottom: '10px'
                                    }}
                                  >
                                    {page.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Optional Pages */}
                        {optional.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold mb-2" style={{ color: '#ffdd4f' }}>Optional (add if needed)</h4>
                            <div className="flex flex-wrap gap-2">
                              {optional.map((pageKey) => {
                                const page = PAGE_SECTIONS[pageKey as keyof typeof PAGE_SECTIONS];
                                if (!page) return null;
                                const active = selected.includes(pageKey as keyof typeof PAGE_SECTIONS);
                                return (
                                  <button
                                    type="button"
                                    key={pageKey}
                                    onClick={() => togglePage(pageKey as keyof typeof PAGE_SECTIONS, false, false)}
                                    className="rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
                                    style={{
                                      borderWidth: '1px',
                                      borderColor: active ? '#a29bfe' : '#ffdd4f',
                                      backgroundColor: active ? '#a29bfe' : 'transparent',
                                      color: active ? 'white' : '#ffdd4f',
                                      padding: '8px 16px',
                                      marginBottom: '10px'
                                    }}
                                  >
                                    {page.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                  
                  {/* Count fields for pages that require counts */}
                  {(data.selectedPages || []).includes('serviceDetails' as keyof typeof PAGE_SECTIONS) && (
                    <Field
                      label="How many individual service detail pages?"
                      type="number"
                      value={data.serviceDetailsCount}
                      onChange={(v) => update("serviceDetailsCount", v)}
                      placeholder="e.g. 5"
                    />
                  )}
                  {(data.selectedPages || []).includes('caseStudies' as keyof typeof PAGE_SECTIONS) && (
                    <Field
                      label="How many case study pages?"
                      type="number"
                      value={data.caseStudyCount}
                      onChange={(v) => update("caseStudyCount", v)}
                      placeholder="e.g. 3"
                    />
                  )}
                  {(data.selectedPages || []).includes('courses' as keyof typeof PAGE_SECTIONS) && (
                    <Field
                      label="How many course / learning track pages?"
                      type="number"
                      value={data.courseCount}
                      onChange={(v) => update("courseCount", v)}
                      placeholder="e.g. 8"
                    />
                  )}
                  {(data.selectedPages || []).includes('productDetails' as keyof typeof PAGE_SECTIONS) && (
                    <Field
                      label="How many individual product detail pages?"
                      type="number"
                      value={data.productDetailsCount}
                      onChange={(v) => update("productDetailsCount", v)}
                      placeholder="e.g. 20"
                    />
                  )}
                </div>
              ) : !data.isRebuild && !data.siteType ? (
                <div>
                  <p className="text-sm" style={{ color: '#ffdd4f', opacity: 0.7 }}>
                    {data.wantsBrandKit 
                      ? "You've selected Logo + Brand Kit Design. You can continue to the next step or also select a site type above if you need a website as well."
                      : "Please select a site type first to see recommended pages."}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                      Pages to update/rebuild <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs mb-3" style={{ color: '#ffdd4f', opacity: 0.7 }}>
                      Select pages that need updating.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(PAGE_SECTIONS).map(([key, value]) => {
                        const active = (data.selectedPagesToUpdate || []).includes(key as keyof typeof PAGE_SECTIONS);
                        return (
                          <button
                            type="button"
                            key={key}
                            onClick={() => togglePage(key as keyof typeof PAGE_SECTIONS, true, true)}
                            className="rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
                            style={{
                              borderWidth: '1px',
                              borderColor: active ? '#a29bfe' : '#ffdd4f',
                              backgroundColor: active ? '#a29bfe' : 'transparent',
                              color: active ? 'white' : '#ffdd4f',
                              padding: '8px 16px',
                              marginBottom: '10px'
                            }}
                          >
                            {value.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                      New pages to add
                    </label>
                    <p className="text-xs mb-3" style={{ color: '#ffdd4f', opacity: 0.7 }}>
                      Select any new pages you want to add.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(PAGE_SECTIONS).map(([key, value]) => {
                        const active = (data.selectedPagesToAdd || []).includes(key as keyof typeof PAGE_SECTIONS);
                        return (
                          <button
                            type="button"
                            key={key}
                            onClick={() => togglePage(key as keyof typeof PAGE_SECTIONS, true, false)}
                            className="rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
                            style={{
                              borderWidth: '1px',
                              borderColor: active ? '#a29bfe' : '#ffdd4f',
                              backgroundColor: active ? '#a29bfe' : 'transparent',
                              color: active ? 'white' : '#ffdd4f',
                              padding: '8px 16px',
                              marginBottom: '10px'
                            }}
                          >
                            {value.label}
                          </button>
                        );
                      })}
                    </div>
                    {(data.selectedPagesToAdd || []).includes('serviceDetails' as keyof typeof PAGE_SECTIONS) && (
                      <Field
                        label="How many individual service detail pages?"
                        type="number"
                        value={data.serviceDetailsCount}
                        onChange={(v) => update("serviceDetailsCount", v)}
                        placeholder="e.g. 5"
                      />
                    )}
                    {(data.selectedPagesToAdd || []).includes('caseStudies' as keyof typeof PAGE_SECTIONS) && (
                      <Field
                        label="How many case study pages?"
                        type="number"
                        value={data.caseStudyCount}
                        onChange={(v) => update("caseStudyCount", v)}
                        placeholder="e.g. 3"
                      />
                    )}
                    {(data.selectedPagesToAdd || []).includes('courses' as keyof typeof PAGE_SECTIONS) && (
                      <Field
                        label="How many course / learning track pages?"
                        type="number"
                        value={data.courseCount}
                        onChange={(v) => update("courseCount", v)}
                        placeholder="e.g. 8"
                      />
                    )}
                    {(data.selectedPagesToAdd || []).includes('productDetails' as keyof typeof PAGE_SECTIONS) && (
                      <Field
                        label="How many individual product detail pages?"
                        type="number"
                        value={data.productDetailsCount}
                        onChange={(v) => update("productDetailsCount", v)}
                        placeholder="e.g. 20"
                      />
                    )}
                  </div>
                </>
              )}

              {data.siteType === "creative" && (
                <Field
                  label="Number of portfolio projects/case studies"
                  type="number"
                  value={data.projectCount}
                  onChange={(v) => update("projectCount", v)}
                  placeholder="e.g. 8"
                />
              )}

              {(data.siteType === "retail" || data.siteType === "retailShipping") && (
                <Field
                  label="Number of products"
                  type="number"
                  value={data.productCount}
                  onChange={(v) => update("productCount", v)}
                  placeholder="e.g. 50"
                />
              )}

              {data.siteType === "webapp" && (
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                    Feature complexity
                  </label>
                  <select
                    value={data.featureComplexity}
                    onChange={(e) => update("featureComplexity", e.target.value as keyof typeof FEATURE_COMPLEXITY)}
                    className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
                    style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', padding: '12px 16px' }}
                  >
                    <option value="" style={{ backgroundColor: '#03040a', color: '#ffdd4f' }}>Select...</option>
                    {Object.entries(FEATURE_COMPLEXITY).map(([key, value]) => (
                      <option key={key} value={key} style={{ backgroundColor: '#03040a', color: '#ffdd4f' }}>
                        {value.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Step 3: Content & Lead Gen */}
        {step === 3 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#ffdd4f' }}>
                Content & lead generation
              </h2>
              <p style={{ color: '#ffdd4f', opacity: 0.8 }}>
                How we'll handle content and what lead generation you need.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  Content handling <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.contentHandling}
                  onChange={(e) => update("contentHandling", e.target.value as keyof typeof CONTENT_OPTIONS)}
                  required
                  className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
                  style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', padding: '12px 16px' }}
                >
                  {Object.entries(CONTENT_OPTIONS).map(([key, value]) => (
                    <option key={key} value={key} style={{ backgroundColor: '#03040a', color: '#ffdd4f' }}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  Lead generator type
                </label>
                <select
                  value={data.leadGenType}
                  onChange={(e) => update("leadGenType", e.target.value as keyof typeof LEAD_GEN)}
                  className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
                  style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', padding: '12px 16px' }}
                >
                  {Object.entries(LEAD_GEN).map(([key, value]) => (
                    <option key={key} value={key} style={{ backgroundColor: '#03040a', color: '#ffdd4f' }}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  <input
                    type="checkbox"
                    checked={data.wantsCustomAnimations}
                    onChange={(e) => update("wantsCustomAnimations", e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  I want custom animations and unique interactive design
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  <input
                    type="checkbox"
                    checked={data.isBudgetConscious}
                    onChange={(e) => update("isBudgetConscious", e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  I'm working with a tight budget and prefer simpler solutions
                </label>
              </div>
            </div>
          </section>
        )}

        {/* Step 4: Integrations & Timeline */}
        {step === 4 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#ffdd4f' }}>
                Integrations & timeline
              </h2>
              <p style={{ color: '#ffdd4f', opacity: 0.8 }}>
                What integrations you need and your timeline.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  Integrations needed
                </label>
                <p className="text-xs mb-3" style={{ color: '#ffdd4f', opacity: 0.7 }}>
                  Select all that apply.
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(INTEGRATIONS).map(([key, value]) => {
                    const active = data.integrations.includes(key as keyof typeof INTEGRATIONS);
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => toggleIntegration(key as keyof typeof INTEGRATIONS)}
                        className="rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
                        style={{
                          borderWidth: '1px',
                          borderColor: active ? '#a29bfe' : '#ffdd4f',
                          backgroundColor: active ? '#a29bfe' : 'transparent',
                          color: active ? 'white' : '#ffdd4f',
                          padding: '8px 16px',
                          marginBottom: '10px'
                        }}
                      >
                        {value.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#ffdd4f' }}>
                  Timeline <span className="text-red-500">*</span>
                </label>
                <select
                  value={data.timeline}
                  onChange={(e) => update("timeline", e.target.value as keyof typeof TIMELINE_MULTIPLIERS)}
                  required
                  className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
                  style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', padding: '12px 16px' }}
                >
                  {Object.entries(TIMELINE_MULTIPLIERS).map(([key, value]) => (
                    <option key={key} value={key} style={{ backgroundColor: '#03040a', color: '#ffdd4f' }}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                label="Ideal launch date"
                type="date"
                value={data.launchDate}
                onChange={(v) => update("launchDate", v)}
              />

              <TextAreaField
                label="Anything else that might affect scope or timing?"
                value={data.extraNotes}
                onChange={(v) => update("extraNotes", v)}
              />
            </div>
          </section>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#ffdd4f' }}>
                Review your details
              </h2>
              <p style={{ color: '#ffdd4f', opacity: 0.8 }}>
                Quick check before you send.
              </p>
            </div>
            <div className="space-y-3 text-sm rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 221, 79, 0.05)', borderColor: '#ffdd4f', borderWidth: '1px', padding: '12px' }}>
              <SummaryRow label="Name" value={data.name} />
              <SummaryRow label="Company" value={data.company} />
              <SummaryRow label="Email" value={data.email} />
              <SummaryRow label="Website" value={data.website || "—"} />
              <SummaryRow label="Site type" value={data.siteType ? SITE_TYPES[data.siteType as keyof typeof SITE_TYPES]?.label : "—"} />
              <SummaryRow label="Rebuild" value={data.isRebuild ? "Yes" : "No"} />
              {!data.isRebuild ? (
                <SummaryRow 
                  label="Selected pages" 
                  value={(data.selectedPages || []).length > 0 
                    ? (data.selectedPages || []).map(k => PAGE_SECTIONS[k]?.label).join(", ") 
                    : "—"} 
                />
              ) : (
                <>
                  <SummaryRow 
                    label="Pages to update" 
                    value={(data.selectedPagesToUpdate || []).length > 0 
                      ? (data.selectedPagesToUpdate || []).map(k => PAGE_SECTIONS[k]?.label).join(", ") 
                      : "—"} 
                  />
                  <SummaryRow 
                    label="New pages" 
                    value={(data.selectedPagesToAdd || []).length > 0 
                      ? (data.selectedPagesToAdd || []).map(k => PAGE_SECTIONS[k]?.label).join(", ") 
                      : "—"} 
                  />
                </>
              )}
              <SummaryRow label="Content handling" value={CONTENT_OPTIONS[data.contentHandling]?.label || "—"} />
              <SummaryRow label="Lead generator" value={LEAD_GEN[data.leadGenType]?.label || "—"} />
              <SummaryRow label="Timeline" value={TIMELINE_MULTIPLIERS[data.timeline]?.label || "—"} />
              {data.integrations.length > 0 && (
                <SummaryRow label="Integrations" value={data.integrations.map(k => INTEGRATIONS[k]?.label).join(", ")} />
              )}
              <SummaryRow label="Brand Kit" value={data.wantsBrandKit ? "Yes" : "No"} />
              <SummaryRow label="Launch date" value={data.launchDate || "—"} />
              {data.extraNotes ? (
                <div className="flex flex-col gap-0 py-2">
                  <span className="text-sm" style={{ color: '#ffdd4f' }}>Extra notes:</span>
                  <span className="font-medium text-sm whitespace-pre-wrap" style={{ color: '#ffdd4f', opacity: 0.9 }}>{data.extraNotes}</span>
                </div>
              ) : (
                <SummaryRow label="Extra notes" value="—" />
              )}
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 mt-5" style={{ borderTop: '1px solid #ffdd4f' }}>
          <div className="text-xs max-w-xs" style={{ color: '#a29bfe', opacity: 0.7 }}>
            You can always refine details later in our kickoff call.
          </div>
          <div className="flex gap-3">
            {step === 1 ? (
              <a
                href="https://www.justinception.studio"
                className="text-sm mt-5 rounded-xl font-medium transition-colors inline-block"
                style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', backgroundColor: 'transparent', padding: '12px 16px', textDecoration: 'none' }}
              >
                Back
              </a>
            ) : step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="text-sm rounded-xl font-medium transition-colors mt-5"
                style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', backgroundColor: 'transparent', padding: '12px 16px' }}
              >
                Back
              </button>
            )}
            {step < 5 && (
              <button
                type="button"
                onClick={nextStep}
                className="text-sm rounded-xl font-medium transition-all mt-5"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: '#ffdd4f',
                  borderWidth: '1px',
                  color: '#ffdd4f',
                  padding: '12px 16px'
                }}
              >
                Continue
              </button>
            )}
            {step === 5 && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-sm rounded-xl font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-5"
                style={{ 
                  backgroundColor: 'transparent',
                  borderColor: '#ffdd4f',
                  borderWidth: '1px',
                  color: '#ffdd4f',
                  padding: '12px 16px'
                }}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            )}
          </div>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {submitError}
          </div>
        )}
      </form>
    </main>
  );
}

// ---- UI helpers ----

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: FieldProps) {
  return (
    <label className="block" style={{ marginBottom: '15px' }}>
      <span className="text-sm font-medium" style={{ color: '#ffdd4f', display: 'block', marginBottom: '2px' }}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl text-sm focus:outline-none transition-all placeholder:text-neutral-400 bg-transparent"
        style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', padding: '12px 16px' }}
      />
    </label>
  );
}

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

function TextAreaField({ label, value, onChange }: TextAreaProps) {
  return (
    <label className="block" style={{ marginBottom: '15px' }}>
      <span className="text-sm font-medium" style={{ color: '#ffdd4f', display: 'block', marginBottom: '2px' }}>{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-xl text-sm focus:outline-none transition-all placeholder:text-neutral-400 resize-none bg-transparent"
        style={{ borderColor: '#ffdd4f', borderWidth: '1px', color: '#ffdd4f', padding: '12px 16px' }}
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-2">
      <span className="text-sm" style={{ color: '#ffdd4f' }}>{label}</span>
      <span className="font-medium text-right" style={{ color: '#ffdd4f' }}>{value}</span>
    </div>
  );
}
