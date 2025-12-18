import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="mb-6">
          <Image
            src="/helmet-headshot-padding-0.png"
            alt="Justin headshot"
            width={600}
            height={600}
            className="h-56 w-56 object-contain"
          />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple">
          About
        </p>
        <div className="mt-2 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-semibold tracking-tight text-brand-yellow sm:text-4xl">
              Your Creative Co-Pilot
            </h2>
            <p className="mt-8 max-w-prose text-base leading-7 text-neutral-300">
              I'm Justin — your mission co-pilot. At justInception Studio, I blend
              design, development, and AI-driven speed to help your brand lift off
              with confidence.
            </p>
          </div>
          <div className="lg:col-span-1">
            <div className="w-fit rounded-2xl border border-brand-purple/30 bg-brand-purple/10 p-6">
              <p className="text-sm font-semibold text-brand-yellow">Operating style</p>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>• Fast iterations, clear checkpoints</li>
                <li>• Practical UX + implementation detail</li>
                <li>• Ship-focused scope control</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
