import Section from "@/components/site/section";

const services = [
  {
    title: "Mission Essentials",
    description:
      "Brand foundations, design direction, and web build essentials to get your launch-ready presence in place.",
  },
  {
    title: "Launch Sequence",
    description:
      "Implementation and delivery: build, QA, deploy, and polish—so the rollout is smooth and confident.",
  },
  {
    title: "Ground Control",
    description:
      "Ongoing support, updates, and optimization to keep your brand thriving post-launch.",
  },
];

export default function ServicesPage() {
  return (
    <Section id="services" eyebrow="Services" title="Prepare for Launch">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
