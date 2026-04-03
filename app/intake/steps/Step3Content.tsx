"use client";

import { CONTENT_OPTIONS, LEAD_GEN } from "@/lib/quote";
import { useIntake } from "../IntakeContext";
import { Checkbox } from "../components/ui";

export function Step3Content() {
  const { data, update, batchUpdate } = useIntake();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#ffdd4f" }}>
          Content & lead generation
        </h2>
        <p style={{ color: "#ffdd4f", opacity: 0.8 }}>
          How we'll handle content and what lead generation you need.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: "#ffdd4f" }}>
            Content handling <span className="text-red-500">*</span>
          </label>
          <select
            value={data.contentHandling}
            onChange={(e) =>
              update("contentHandling", e.target.value as keyof typeof CONTENT_OPTIONS)
            }
            required
            className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
            style={{ borderColor: "#ffdd4f", borderWidth: "1px", color: "#ffdd4f", padding: "12px 16px" }}
          >
            {Object.entries(CONTENT_OPTIONS).map(([key, value]) => (
              <option key={key} value={key} style={{ backgroundColor: "#03040a", color: "#ffdd4f" }}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: "#ffdd4f" }}>
            Lead generator type
          </label>
          <select
            value={data.leadGenType}
            onChange={(e) =>
              update("leadGenType", e.target.value as keyof typeof LEAD_GEN)
            }
            className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
            style={{ borderColor: "#ffdd4f", borderWidth: "1px", color: "#ffdd4f", padding: "12px 16px" }}
          >
            {Object.entries(LEAD_GEN).map(([key, value]) => (
              <option key={key} value={key} style={{ backgroundColor: "#03040a", color: "#ffdd4f" }}>
                {value.label}
              </option>
            ))}
          </select>
        </div>

        <Checkbox
          checked={data.wantsCustomAnimations}
          onChange={(checked) => {
            batchUpdate((prev) => ({
              ...prev,
              wantsCustomAnimations: checked,
              isBudgetConscious: checked ? false : prev.isBudgetConscious,
            }));
          }}
          label="I want custom animations and unique interactive design"
          description="Webflow site with custom animations (~$250/page)"
        />

        <Checkbox
          checked={data.isBudgetConscious}
          onChange={(checked) => {
            batchUpdate((prev) => ({
              ...prev,
              isBudgetConscious: checked,
              wantsCustomAnimations: checked ? false : prev.wantsCustomAnimations,
            }));
          }}
          label="I'm working with a tight budget and prefer simpler solutions"
          description="GoDaddy, Wix, or similar builder platform (no platform charge)"
        />
      </div>
    </section>
  );
}
