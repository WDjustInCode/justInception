"use client";

import { createContext, useContext, useState } from "react";
import {
  SITE_TYPES,
  INTEGRATIONS,
  PAGE_SECTIONS,
  DEFAULT_SITEMAPS,
  TIMELINE_MULTIPLIERS,
  CONTENT_OPTIONS,
  LEAD_GEN,
  FEATURE_COMPLEXITY,
} from "@/lib/quote";

export type FormData = {
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

export const initialData: FormData = {
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

export function getDefaultPagesForSiteType(
  siteType: keyof typeof SITE_TYPES | ""
): (keyof typeof PAGE_SECTIONS)[] {
  if (!siteType) return ["home"];
  const sitemap = DEFAULT_SITEMAPS[siteType];
  if (!sitemap) return ["home"];
  return [...sitemap.core, ...sitemap.recommended] as (keyof typeof PAGE_SECTIONS)[];
}

function persist(data: FormData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("intakeFormData", JSON.stringify(data));
  }
}

type IntakeContextType = {
  data: FormData;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  batchUpdate: (updater: (prev: FormData) => FormData) => void;
  toggleIntegration: (key: keyof typeof INTEGRATIONS) => void;
  togglePage: (
    pageKey: keyof typeof PAGE_SECTIONS,
    isRebuild: boolean,
    isUpdate: boolean
  ) => void;
};

const IntakeContext = createContext<IntakeContextType | null>(null);

export function IntakeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("intakeFormData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const loaded: FormData = {
            ...initialData,
            ...parsed,
            selectedPages: parsed.selectedPages || initialData.selectedPages,
            selectedPagesToUpdate:
              parsed.selectedPagesToUpdate || initialData.selectedPagesToUpdate,
            selectedPagesToAdd:
              parsed.selectedPagesToAdd || initialData.selectedPagesToAdd,
            integrations: parsed.integrations || initialData.integrations,
          };
          if (
            loaded.siteType &&
            !loaded.isRebuild &&
            (!loaded.selectedPages || loaded.selectedPages.length === 0)
          ) {
            loaded.selectedPages = getDefaultPagesForSiteType(
              loaded.siteType as keyof typeof SITE_TYPES
            ) as (keyof typeof PAGE_SECTIONS)[];
          }
          return loaded;
        } catch {
          return initialData;
        }
      }
    }
    return initialData;
  });

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "siteType" && !prev.isRebuild && value) {
        next.selectedPages = getDefaultPagesForSiteType(
          value as keyof typeof SITE_TYPES
        ) as (keyof typeof PAGE_SECTIONS)[];
      }
      persist(next);
      return next;
    });
  }

  function batchUpdate(updater: (prev: FormData) => FormData) {
    setData((prev) => {
      const next = updater(prev);
      persist(next);
      return next;
    });
  }

  function toggleIntegration(key: keyof typeof INTEGRATIONS) {
    setData((prev) => {
      const exists = prev.integrations.includes(key);
      const next = {
        ...prev,
        integrations: exists
          ? prev.integrations.filter((k) => k !== key)
          : [...prev.integrations, key],
      };
      persist(next);
      return next;
    });
  }

  function togglePage(
    pageKey: keyof typeof PAGE_SECTIONS,
    isRebuild: boolean,
    isUpdate: boolean
  ) {
    setData((prev) => {
      let targetArray: (keyof typeof PAGE_SECTIONS)[];
      if (isRebuild) {
        targetArray = isUpdate
          ? prev.selectedPagesToUpdate || []
          : prev.selectedPagesToAdd || [];
      } else {
        targetArray = prev.selectedPages || [];
      }

      const exists = targetArray.includes(pageKey);
      const newArray = exists
        ? targetArray.filter((k) => k !== pageKey)
        : [...targetArray, pageKey];

      const next = {
        ...prev,
        ...(isRebuild
          ? isUpdate
            ? { selectedPagesToUpdate: newArray }
            : { selectedPagesToAdd: newArray }
          : { selectedPages: newArray }),
      };
      persist(next);
      return next;
    });
  }

  return (
    <IntakeContext.Provider
      value={{ data, update, batchUpdate, toggleIntegration, togglePage }}
    >
      {children}
    </IntakeContext.Provider>
  );
}

export function useIntake() {
  const ctx = useContext(IntakeContext);
  if (!ctx) throw new Error("useIntake must be used within IntakeProvider");
  return ctx;
}
