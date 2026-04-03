"use client";

import { useState } from "react";
import { SITE_TYPES, type QuoteFormInput, type QuoteResult } from "@/lib/quote";
import { IntakeProvider, useIntake } from "./IntakeContext";
import { Step1Contact } from "./steps/Step1Contact";
import { Step2Scope } from "./steps/Step2Scope";
import { Step3Content } from "./steps/Step3Content";
import { Step4Integrations } from "./steps/Step4Integrations";
import { Step5Review } from "./steps/Step5Review";
import { SuccessView } from "./components/SuccessView";

export default function IntakeFormPage() {
  return (
    <IntakeProvider>
      <IntakeForm />
    </IntakeProvider>
  );
}

function IntakeForm() {
  const { data } = useIntake();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);

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
      const quoteData: QuoteFormInput = {
        siteType: data.siteType ? (data.siteType as keyof typeof SITE_TYPES) : undefined,
        timeline: data.timeline,
        isRebuild: data.isRebuild,
        selectedPages: data.isRebuild ? undefined : data.selectedPages,
        selectedPagesToUpdate: data.isRebuild ? data.selectedPagesToUpdate : undefined,
        selectedPagesToAdd: data.isRebuild ? data.selectedPagesToAdd : undefined,
        serviceDetailsCount: data.serviceDetailsCount
          ? parseInt(data.serviceDetailsCount)
          : undefined,
        caseStudyCount: data.caseStudyCount ? parseInt(data.caseStudyCount) : undefined,
        courseCount: data.courseCount ? parseInt(data.courseCount) : undefined,
        productDetailsCount: data.productDetailsCount
          ? parseInt(data.productDetailsCount)
          : undefined,
        contentHandling: data.contentHandling,
        projectCount: data.projectCount ? parseInt(data.projectCount) : undefined,
        productCount: data.productCount ? parseInt(data.productCount) : undefined,
        featureComplexity: data.featureComplexity
          ? (data.featureComplexity as QuoteFormInput["featureComplexity"])
          : undefined,
        leadGenType: data.leadGenType,
        integrations: data.integrations,
        wantsCustomAnimations: data.wantsCustomAnimations,
        isBudgetConscious: data.isBudgetConscious,
        wantsBrandKit: data.wantsBrandKit,
      };

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, ...quoteData }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const responseData = await res.json();
      if (responseData.quote?.breakdown) {
        setQuoteResult(responseData.quote.breakdown);
      }

      setSubmitted(true);
      if (typeof window !== "undefined") {
        localStorage.removeItem("intakeFormData");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return <SuccessView quoteResult={quoteResult} />;
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center p-8 md:p-12"
      style={{ backgroundColor: "#03040a" }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full rounded-3xl space-y-10"
        style={{ padding: "80px", backgroundColor: "#03040a", color: "#ffdd4f" }}
      >
        {/* Progress */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight" style={{ color: "#ffdd4f" }}>
            Website Project Intake
          </h1>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? "32px" : "24px",
                  backgroundColor: i === step ? "#a29bfe" : "#2d4e89",
                }}
              />
            ))}
          </div>
        </div>

        {step === 1 && <Step1Contact />}
        {step === 2 && <Step2Scope />}
        {step === 3 && <Step3Content />}
        {step === 4 && <Step4Integrations />}
        {step === 5 && <Step5Review />}

        {/* Navigation */}
        <div
          className="flex items-center justify-between pt-6 mt-5"
          style={{ borderTop: "1px solid #ffdd4f" }}
        >
          <div className="text-xs max-w-xs" style={{ color: "#a29bfe", opacity: 0.7 }}>
            You can always refine details later in our kickoff call.
          </div>
          <div className="flex gap-3">
            {step === 1 ? (
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
                style={{
                  border: "1px solid rgba(162, 155, 254, 0.5)",
                  backgroundColor: "rgba(162, 155, 254, 0.1)",
                  color: "#ffdd4f",
                  padding: "10px 20px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(162, 155, 254, 0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(162, 155, 254, 0.1)")
                }
              >
                Back
              </a>
            ) : (
              step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
                  style={{
                    border: "1px solid rgba(162, 155, 254, 0.5)",
                    backgroundColor: "rgba(162, 155, 254, 0.1)",
                    color: "#ffdd4f",
                    padding: "10px 20px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(162, 155, 254, 0.2)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(162, 155, 254, 0.1)")
                  }
                >
                  Back
                </button>
              )
            )}
            {step < 5 && (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: "#ffdd4f",
                  color: "#03040a",
                  padding: "10px 20px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(255, 221, 79, 0.9)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ffdd4f")
                }
              >
                Continue
              </button>
            )}
            {step === 5 && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  backgroundColor: "#ffdd4f",
                  color: "#03040a",
                  padding: "10px 20px",
                }}
                onMouseEnter={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.backgroundColor = "rgba(255, 221, 79, 0.9)")
                }
                onMouseLeave={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.backgroundColor = "#ffdd4f")
                }
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
