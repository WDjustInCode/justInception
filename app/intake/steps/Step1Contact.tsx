"use client";

import { useIntake } from "../IntakeContext";
import { Field } from "../components/ui";

export function Step1Contact() {
  const { data, update } = useIntake();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight" style={{ color: "#ffdd4f" }}>
          Contact & business details
        </h2>
        <p style={{ color: "#ffdd4f", opacity: 0.8 }}>
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
  );
}
