"use client";

import { useMemo, useState } from "react";
import Section from "./section";
import { sendContact } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(() => status === "sending", [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await sendContact(fd);
      if (!res.ok) throw new Error(res.error ?? "Failed to send.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send.");
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Make Contact">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="rounded-2xl border border-brand-purple/30 bg-brand-purple/10 p-6">
          <p className="text-sm leading-6 text-neutral-300">
            Send a quick message and (optionally) attach files. I'll follow up
            with next steps and a plan.
          </p>

          <div className="mt-6 rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-4">
            <p className="text-xs text-neutral-400">
              Your message will be delivered directly to my inbox. I typically respond within 24 hours.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-6"
        >
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-200">
                Name<span className="text-neutral-500">*</span>
              </label>
              <input
                name="name"
                required
                className="mt-2 w-full rounded-xl border border-brand-purple/30 bg-brand-bg px-3 py-2 text-sm text-neutral-200 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-200">
                Email<span className="text-neutral-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-brand-purple/30 bg-brand-bg px-3 py-2 text-sm text-neutral-200 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-200">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                className="mt-2 w-full resize-y rounded-xl border border-brand-purple/30 bg-brand-bg px-3 py-2 text-sm text-neutral-200 outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30"
                placeholder="What are we building?"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-200">
                Attach files (optional)
              </label>
              <input
                name="files"
                type="file"
                multiple
                className="mt-2 block w-full text-sm text-neutral-300 file:mr-3 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-neutral-950 hover:file:bg-neutral-200"
              />
            </div>

            <button
              type="submit"
              disabled={disabled}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-bg hover:bg-brand-yellow/90 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
            >
              {status === "sending" ? "Sending…" : "Transmit Message"}
            </button>

            {status === "sent" ? (
              <p className="text-sm text-neutral-200">
                Received. I’ll get back to you shortly.
              </p>
            ) : null}

            {status === "error" ? (
              <p className="text-sm text-red-300">Error: {error}</p>
            ) : null}
          </div>
        </form>
      </div>
    </Section>
  );
}
