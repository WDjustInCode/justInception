"use client";

import { type QuoteResult } from "@/lib/quote";

type SuccessViewProps = {
  quoteResult: QuoteResult | null;
};

export function SuccessView({ quoteResult }: SuccessViewProps) {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-8 md:p-12"
      style={{ backgroundColor: "#03040a" }}
    >
      <div
        className="max-w-3xl w-full rounded-3xl space-y-6"
        style={{ padding: "80px", backgroundColor: "#03040a", color: "#ffdd4f" }}
      >
        <div className="text-center">
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{ width: "64px", height: "64px", margin: "0 auto 24px", backgroundColor: "#a29bfe" }}
          >
            <svg
              style={{ width: "32px", height: "32px", color: "white" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#ffdd4f" }}>
            Thanks for sharing your project
          </h1>
          <p className="leading-relaxed mb-6" style={{ color: "#ffdd4f", opacity: 0.8 }}>
            I'll review your submission and get back to you with next steps.
          </p>
        </div>

        {quoteResult && (
          <div
            className="text-sm rounded-2xl p-6"
            style={{
              backgroundColor: "rgba(255, 221, 79, 0.05)",
              borderColor: "#ffdd4f",
              borderWidth: "1px",
              padding: "12px",
            }}
          >
            <div className="space-y-2">
              {quoteResult.breakdown.length === 0 && (
                <div className="text-xs" style={{ color: "#ffdd4f", opacity: 0.7 }}>
                  No items selected.
                </div>
              )}
              {quoteResult.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between gap-6 py-2">
                  <span className="text-sm" style={{ color: "#ffdd4f" }}>
                    {item.label}
                  </span>
                  <span className="font-medium text-right" style={{ color: "#ffdd4f" }}>
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255, 221, 79, 0.2)",
                paddingTop: "2px",
                marginTop: "2px",
                marginBottom: "12px",
              }}
            >
              <div className="flex items-baseline justify-between">
                <span style={{ color: "#ffdd4f" }}>Estimated Price</span>
                <span className="font-medium text-right" style={{ color: "#ffdd4f" }}>
                  ${quoteResult.total.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="pt-2" style={{ borderTop: "1px solid rgba(255, 221, 79, 0.2)" }}>
              <div className="text-xs leading-relaxed" style={{ color: "#ffdd4f", opacity: 0.8 }}>
                <p>
                  <strong>Please note:</strong> This is an estimated price based on the information
                  provided. The quote calculator isn't perfect and doesn't take into account any
                  details mentioned in your extra notes. The final price could be more or less
                  depending on specific requirements, but this estimate should give you a good
                  ballpark figure.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
