"use client";

import {
  SITE_TYPES,
  PAGE_SECTIONS,
  CONTENT_OPTIONS,
  LEAD_GEN,
  TIMELINE_MULTIPLIERS,
  INTEGRATIONS,
} from "@/lib/quote";
import { useIntake } from "../IntakeContext";
import { SummaryRow } from "../components/ui";

export function Step5Review() {
  const { data } = useIntake();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#ffdd4f" }}>
          Review your details
        </h2>
        <p style={{ color: "#ffdd4f", opacity: 0.8 }}>Quick check before you send.</p>
      </div>
      <div
        className="space-y-3 text-sm rounded-2xl p-6"
        style={{
          backgroundColor: "rgba(255, 221, 79, 0.05)",
          borderColor: "#ffdd4f",
          borderWidth: "1px",
          padding: "12px",
        }}
      >
        <SummaryRow label="Name" value={data.name} />
        <SummaryRow label="Company" value={data.company} />
        <SummaryRow label="Email" value={data.email} />
        <SummaryRow label="Website" value={data.website || "—"} />
        <SummaryRow
          label="Site type"
          value={data.siteType ? SITE_TYPES[data.siteType as keyof typeof SITE_TYPES]?.label : "—"}
        />
        <SummaryRow label="Rebuild" value={data.isRebuild ? "Yes" : "No"} />
        {!data.isRebuild ? (
          <SummaryRow
            label="Selected pages"
            value={
              (data.selectedPages || []).length > 0
                ? (data.selectedPages || []).map((k) => PAGE_SECTIONS[k]?.label).join(", ")
                : "—"
            }
          />
        ) : (
          <>
            <SummaryRow
              label="Pages to update"
              value={
                (data.selectedPagesToUpdate || []).length > 0
                  ? (data.selectedPagesToUpdate || [])
                      .map((k) => PAGE_SECTIONS[k]?.label)
                      .join(", ")
                  : "—"
              }
            />
            <SummaryRow
              label="New pages"
              value={
                (data.selectedPagesToAdd || []).length > 0
                  ? (data.selectedPagesToAdd || [])
                      .map((k) => PAGE_SECTIONS[k]?.label)
                      .join(", ")
                  : "—"
              }
            />
          </>
        )}
        <SummaryRow
          label="Content handling"
          value={CONTENT_OPTIONS[data.contentHandling]?.label || "—"}
        />
        <SummaryRow
          label="Lead generator"
          value={LEAD_GEN[data.leadGenType]?.label || "—"}
        />
        <SummaryRow
          label="Timeline"
          value={TIMELINE_MULTIPLIERS[data.timeline]?.label || "—"}
        />
        {data.integrations.length > 0 && (
          <SummaryRow
            label="Integrations"
            value={data.integrations.map((k) => INTEGRATIONS[k]?.label).join(", ")}
          />
        )}
        <SummaryRow label="Brand Kit" value={data.wantsBrandKit ? "Yes" : "No"} />
        <SummaryRow label="Launch date" value={data.launchDate || "—"} />
        {data.extraNotes ? (
          <div className="flex flex-col gap-0 py-2">
            <span className="text-sm" style={{ color: "#ffdd4f" }}>
              Extra notes:
            </span>
            <span
              className="font-medium text-sm whitespace-pre-wrap"
              style={{ color: "#ffdd4f", opacity: 0.9 }}
            >
              {data.extraNotes}
            </span>
          </div>
        ) : (
          <SummaryRow label="Extra notes" value="—" />
        )}
      </div>
    </section>
  );
}
