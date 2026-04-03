"use client";

import {
  SITE_TYPES,
  FEATURE_COMPLEXITY,
  PAGE_SECTIONS,
  DEFAULT_SITEMAPS,
} from "@/lib/quote";
import { useIntake, getDefaultPagesForSiteType } from "../IntakeContext";
import { Checkbox, Field } from "../components/ui";

export function Step2Scope() {
  const { data, update, batchUpdate, togglePage } = useIntake();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#ffdd4f" }}>
          Project type & scope
        </h2>
        <p style={{ color: "#ffdd4f", opacity: 0.8 }}>
          What we're building and how big it is.
        </p>
      </div>
      <div className="space-y-4">
        <Checkbox
          checked={data.wantsBrandKit}
          onChange={(checked) => update("wantsBrandKit", checked)}
          label="Logo + Brand Kit Design"
          description="You can choose this service independently or alongside a website project."
        />

        <div>
          <label className="block text-sm font-medium" style={{ color: "#ffdd4f" }}>
            Site type {!data.wantsBrandKit && <span className="text-red-500">*</span>}
          </label>
          <select
            value={data.siteType}
            onChange={(e) => update("siteType", e.target.value as keyof typeof SITE_TYPES)}
            required={!data.wantsBrandKit}
            className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
            style={{ borderColor: "#ffdd4f", borderWidth: "1px", color: "#ffdd4f", padding: "12px 16px" }}
          >
            <option value="" style={{ backgroundColor: "#03040a", color: "#ffdd4f" }}>
              {data.wantsBrandKit ? "No website needed" : "Select..."}
            </option>
            {Object.entries(SITE_TYPES).map(([key, value]) => (
              <option key={key} value={key} style={{ backgroundColor: "#03040a", color: "#ffdd4f" }}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        <Checkbox
          checked={data.isRebuild}
          onChange={(isRebuild) => {
            batchUpdate((prev) => {
              const defaultPages = isRebuild
                ? []
                : prev.siteType
                ? (getDefaultPagesForSiteType(prev.siteType as keyof typeof SITE_TYPES) as (keyof typeof PAGE_SECTIONS)[])
                : (["home"] as (keyof typeof PAGE_SECTIONS)[]);
              return {
                ...prev,
                isRebuild,
                selectedPages: defaultPages,
                selectedPagesToUpdate: [],
                selectedPagesToAdd: [],
              };
            });
          }}
          label="This is a rebuild/redesign of an existing site"
        />

        <PageSelector data={data} togglePage={togglePage} />

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
            <label className="block text-sm font-medium mb-2" style={{ color: "#ffdd4f" }}>
              Feature complexity
            </label>
            <select
              value={data.featureComplexity}
              onChange={(e) =>
                update("featureComplexity", e.target.value as keyof typeof FEATURE_COMPLEXITY)
              }
              className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
              style={{ borderColor: "#ffdd4f", borderWidth: "1px", color: "#ffdd4f", padding: "12px 16px" }}
            >
              <option value="" style={{ backgroundColor: "#03040a", color: "#ffdd4f" }}>
                Select...
              </option>
              {Object.entries(FEATURE_COMPLEXITY).map(([key, value]) => (
                <option key={key} value={key} style={{ backgroundColor: "#03040a", color: "#ffdd4f" }}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </section>
  );
}

// Extracted sub-component for the pages/sections selector
type PageSelectorProps = {
  data: ReturnType<typeof useIntake>["data"];
  togglePage: ReturnType<typeof useIntake>["togglePage"];
};

function PageSelector({ data, togglePage }: PageSelectorProps) {
  if (!data.isRebuild && data.siteType) {
    const sitemap = DEFAULT_SITEMAPS[data.siteType as keyof typeof DEFAULT_SITEMAPS];
    if (!sitemap) return null;

    const selected = data.selectedPages || [];
    const { core = [], recommended = [], optional = [] } = sitemap;

    return (
      <div>
        <label className="block text-sm font-medium" style={{ color: "#ffdd4f" }}>
          Pages & sections needed <span className="text-red-500">*</span>
        </label>
        <p className="text-xs mb-3" style={{ color: "#ffdd4f", opacity: 0.7 }}>
          Core and recommended pages are pre-selected, but you can remove any you don't need.
          Optional pages can be added.
        </p>

        <PageGroup
          title="Core Pages (included)"
          pages={core}
          selected={selected}
          onToggle={(key) => togglePage(key, false, false)}
        />
        <PageGroup
          title="Recommended (~$150/page)"
          pages={recommended}
          selected={selected}
          onToggle={(key) => togglePage(key, false, false)}
        />
        <PageGroup
          title="Optional (~$150/page)"
          pages={optional}
          selected={selected}
          onToggle={(key) => togglePage(key, false, false)}
          description={
            optional.includes("contact" as keyof typeof PAGE_SECTIONS)
              ? "A contact section will be implemented on your site unless you select the separate Contact page option below."
              : "Additional pages you can add to your site."
          }
        />

        <PageCountFields selected={selected} data={data} />
      </div>
    );
  }

  if (!data.isRebuild && !data.siteType) {
    return (
      <div>
        <p className="text-sm" style={{ color: "#ffdd4f", opacity: 0.7 }}>
          {data.wantsBrandKit
            ? "You've selected Logo + Brand Kit Design. You can continue to the next step or also select a site type above if you need a website as well."
            : "Please select a site type first to see recommended pages."}
        </p>
      </div>
    );
  }

  // Rebuild mode
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#ffdd4f" }}>
          Pages to update/rebuild <span className="text-red-500">*</span>
        </label>
        <p className="text-xs mb-3" style={{ color: "#ffdd4f", opacity: 0.7 }}>
          Select pages that need updating.
        </p>
        <PageButtonGrid
          pages={Object.keys(PAGE_SECTIONS) as (keyof typeof PAGE_SECTIONS)[]}
          selected={data.selectedPagesToUpdate || []}
          onToggle={(key) => togglePage(key, true, true)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "#ffdd4f" }}>
          New pages to add
        </label>
        <p className="text-xs mb-3" style={{ color: "#ffdd4f", opacity: 0.7 }}>
          Select any new pages you want to add.
        </p>
        <PageButtonGrid
          pages={Object.keys(PAGE_SECTIONS) as (keyof typeof PAGE_SECTIONS)[]}
          selected={data.selectedPagesToAdd || []}
          onToggle={(key) => togglePage(key, true, false)}
        />
        <RebuildCountFields data={data} />
      </div>
    </>
  );
}

type PageGroupProps = {
  title: string;
  pages: string[];
  selected: (keyof typeof PAGE_SECTIONS)[];
  onToggle: (key: keyof typeof PAGE_SECTIONS) => void;
  description?: string;
};

function PageGroup({ title, pages, selected, onToggle, description }: PageGroupProps) {
  if (pages.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold mb-2" style={{ color: "#ffdd4f" }}>
        {title}
      </h4>
      {description && (
        <p className="text-xs mb-3" style={{ color: "#ffdd4f", opacity: 0.7 }}>
          {description}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {pages.map((pageKey) => {
          const page = PAGE_SECTIONS[pageKey as keyof typeof PAGE_SECTIONS];
          if (!page) return null;
          const active = selected.includes(pageKey as keyof typeof PAGE_SECTIONS);
          return (
            <PageToggleButton
              key={pageKey}
              label={page.label}
              active={active}
              onClick={() => onToggle(pageKey as keyof typeof PAGE_SECTIONS)}
            />
          );
        })}
      </div>
    </div>
  );
}

type PageButtonGridProps = {
  pages: (keyof typeof PAGE_SECTIONS)[];
  selected: (keyof typeof PAGE_SECTIONS)[];
  onToggle: (key: keyof typeof PAGE_SECTIONS) => void;
};

function PageButtonGrid({ pages, selected, onToggle }: PageButtonGridProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {pages.map((key) => {
        const page = PAGE_SECTIONS[key];
        if (!page) return null;
        const active = selected.includes(key);
        return (
          <PageToggleButton
            key={key}
            label={page.label}
            active={active}
            onClick={() => onToggle(key)}
          />
        );
      })}
    </div>
  );
}

function PageToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full text-sm font-medium transition-all duration-200 shadow-sm"
      style={{
        borderWidth: "1px",
        borderColor: active ? "#a29bfe" : "#ffdd4f",
        backgroundColor: active ? "#a29bfe" : "transparent",
        color: active ? "white" : "#ffdd4f",
        padding: "8px 16px",
        marginBottom: "10px",
      }}
    >
      {label}
    </button>
  );
}

// Count fields for pages that require a quantity — new builds
function PageCountFields({
  selected,
  data,
}: {
  selected: (keyof typeof PAGE_SECTIONS)[];
  data: ReturnType<typeof useIntake>["data"];
}) {
  const { update } = useIntake();
  return (
    <>
      {selected.includes("serviceDetails" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many individual service detail pages?"
          type="number"
          value={data.serviceDetailsCount}
          onChange={(v) => update("serviceDetailsCount", v)}
          placeholder="e.g. 5"
        />
      )}
      {selected.includes("caseStudies" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many case study pages?"
          type="number"
          value={data.caseStudyCount}
          onChange={(v) => update("caseStudyCount", v)}
          placeholder="e.g. 3"
        />
      )}
      {selected.includes("courses" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many course / learning track pages?"
          type="number"
          value={data.courseCount}
          onChange={(v) => update("courseCount", v)}
          placeholder="e.g. 8"
        />
      )}
      {selected.includes("productDetails" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many individual product detail pages?"
          type="number"
          value={data.productDetailsCount}
          onChange={(v) => update("productDetailsCount", v)}
          placeholder="e.g. 20"
        />
      )}
    </>
  );
}

// Count fields for pages that require a quantity — rebuild "pages to add"
function RebuildCountFields({
  data,
}: {
  data: ReturnType<typeof useIntake>["data"];
}) {
  const { update } = useIntake();
  const selected = data.selectedPagesToAdd || [];
  return (
    <>
      {selected.includes("serviceDetails" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many individual service detail pages?"
          type="number"
          value={data.serviceDetailsCount}
          onChange={(v) => update("serviceDetailsCount", v)}
          placeholder="e.g. 5"
        />
      )}
      {selected.includes("caseStudies" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many case study pages?"
          type="number"
          value={data.caseStudyCount}
          onChange={(v) => update("caseStudyCount", v)}
          placeholder="e.g. 3"
        />
      )}
      {selected.includes("courses" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many course / learning track pages?"
          type="number"
          value={data.courseCount}
          onChange={(v) => update("courseCount", v)}
          placeholder="e.g. 8"
        />
      )}
      {selected.includes("productDetails" as keyof typeof PAGE_SECTIONS) && (
        <Field
          label="How many individual product detail pages?"
          type="number"
          value={data.productDetailsCount}
          onChange={(v) => update("productDetailsCount", v)}
          placeholder="e.g. 20"
        />
      )}
    </>
  );
}
