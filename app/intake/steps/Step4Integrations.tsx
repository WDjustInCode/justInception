"use client";

import { INTEGRATIONS, TIMELINE_MULTIPLIERS } from "@/lib/quote";
import { useIntake } from "../IntakeContext";
import { Field, TextAreaField } from "../components/ui";

export function Step4Integrations() {
  const { data, update, toggleIntegration } = useIntake();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#ffdd4f" }}>
          Integrations & timeline
        </h2>
        <p style={{ color: "#ffdd4f", opacity: 0.8 }}>
          What integrations you need and your timeline.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium" style={{ color: "#ffdd4f" }}>
            Integrations needed
          </label>
          <p className="text-xs mb-3" style={{ color: "#ffdd4f", opacity: 0.7 }}>
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
                    borderWidth: "1px",
                    borderColor: active ? "#a29bfe" : "#ffdd4f",
                    backgroundColor: active ? "#a29bfe" : "transparent",
                    color: active ? "white" : "#ffdd4f",
                    padding: "8px 16px",
                    marginBottom: "10px",
                  }}
                >
                  {value.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium" style={{ color: "#ffdd4f" }}>
            Timeline <span className="text-red-500">*</span>
          </label>
          <select
            value={data.timeline}
            onChange={(e) =>
              update("timeline", e.target.value as keyof typeof TIMELINE_MULTIPLIERS)
            }
            required
            className="w-full rounded-xl text-sm focus:outline-none transition-all bg-transparent"
            style={{ borderColor: "#ffdd4f", borderWidth: "1px", color: "#ffdd4f", padding: "12px 16px" }}
          >
            {Object.entries(TIMELINE_MULTIPLIERS).map(([key, value]) => (
              <option key={key} value={key} style={{ backgroundColor: "#03040a", color: "#ffdd4f" }}>
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
  );
}
