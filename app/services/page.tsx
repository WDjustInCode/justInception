"use client";

import Link from "next/link";
import Image from "next/image";

interface Service {
  id: string;
  title: string;
  description?: string;
  iconUrl: string;
  href?: string;
}

interface ServiceCategory {
  iconUrl: string;
  title: string;
  subtitle: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    iconUrl: '/noun-moon-rocket.svg',
    title: 'Core Systems',
    subtitle: 'Best for: new builds, rebuilds, MVPs',
    services: [
      {
        id: 'primary-systems',
        title: 'Primary Systems Assembly',
        description: 'Complete website builds from the ground up',
        iconUrl: '/noun-moon-rocket.svg',
        href: '/services#primary-systems',
      },
      {
        id: 'flight-systems',
        title: 'Flight Systems Engineering',
        description: 'Web apps, SaaS platforms, and interactive tools',
        iconUrl: '/noun-sattelite.svg',
        href: '/services#flight-systems',
      },
      {
        id: 'interface-navigation',
        title: 'Interface & Navigation Design',
        description: 'UI/UX design and user-centered experiences',
        iconUrl: '/noun-big-dipper.svg',
        href: '/services#interface-navigation',
      },
    ],
  },
  {
    iconUrl: '/noun-telescope.svg',
    title: 'Optimization & Visibility',
    subtitle: 'Best for: post-launch improvements and growth',
    services: [
      {
        id: 'launch-optimization',
        title: 'Launch Optimization',
        description: 'SEO, performance, and Core Web Vitals',
        iconUrl: '/noun-space-rocket.svg',
        href: '/services#launch-optimization',
      },
      {
        id: 'signal-calibration',
        title: 'Signal Calibration',
        description: 'Analytics setup and tracking implementation',
        iconUrl: '/noun-telescope.svg',
        href: '/services#signal-calibration',
      },
      {
        id: 'systems-tuning',
        title: 'Systems Tuning',
        description: 'Speed optimization and technical improvements',
        iconUrl: '/noun-comet.svg',
        href: '/services#systems-tuning',
      },
    ],
  },
  {
    iconUrl: '/noun-sattelite-2.svg',
    title: 'Integrations\n& Data',
    subtitle: 'Best for: operational scale and insight',
    services: [
      {
        id: 'instrumentation-docking',
        title: 'Instrumentation & Docking',
        description: 'API integrations and third-party connections',
        iconUrl: '/noun-sattelite-2.svg',
        href: '/services#instrumentation-docking',
      },
      {
        id: 'analytics-crm',
        title: 'Analytics, CRM, Payments',
        description: 'Business tools and dashboards',
        iconUrl: '/noun-black-hole.svg',
        href: '/services#analytics-crm',
      },
      {
        id: 'automation-reporting',
        title: 'Automation & Reporting',
        description: 'Workflow automation and data pipelines',
        iconUrl: '/noun-check-list.svg',
        href: '/services#automation-reporting',
      },
    ],
  },
  {
    iconUrl: '/noun-astronaut-in-space.svg',
    title: 'Experience & Feedback',
    subtitle: 'Best for: product refinement and differentiation',
    services: [
      {
        id: 'guidance-feedback',
        title: 'Guidance & Feedback Systems',
        description: 'User onboarding and interactive tours',
        iconUrl: '/noun-moon.svg',
        href: '/services#guidance-feedback',
      },
      {
        id: 'motion-design',
        title: 'Motion Design',
        description: 'Custom animations and transitions',
        iconUrl: '/noun-space-rocket-2.svg',
        href: '/services#motion-design',
      },
      {
        id: 'micro-interactions',
        title: 'Micro-interactions & UI Polish',
        description: 'Delightful details and refined experiences',
        iconUrl: '/noun-astronaut-on-moon.svg',
        href: '/services#micro-interactions',
      },
    ],
  },
  {
    iconUrl: '/noun-sattelite.svg',
    title: 'Sustainment',
    subtitle: 'Best for: long-term reliability',
    services: [
      {
        id: 'mission-sustainment',
        title: 'Mission Sustainment',
        description: 'Ongoing maintenance and monitoring',
        iconUrl: '/noun-astronaut-in-space.svg',
        href: '/services#mission-sustainment',
      },
      {
        id: 'updates-fixes',
        title: 'Updates, Fixes, Monitoring',
        description: 'Bug fixes, security updates, and uptime',
        iconUrl: '/noun-sattelite.svg',
        href: '/services#updates-fixes',
      },
      {
        id: 'support-retainers',
        title: 'Support Blocks & Retainers',
        description: 'Dedicated support hours and priority access',
        iconUrl: '/noun-check-list.svg',
        href: '/services#support-retainers',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-bg pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-9">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple">
            Design + Development Services
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-brand-yellow sm:text-5xl">
            Service Modules
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-neutral-300">
            Modular services designed to meet your project at any stage—from initial concept to ongoing optimization.
          </p>
        </div>

        {/* Service Categories Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {serviceCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-brand-purple/30 bg-brand-purple/5 p-6 hover:bg-brand-purple/10 transition-colors"
            >
              {/* Category Header */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <Image
                      src={category.iconUrl}
                      alt={category.title}
                      width={48}
                      height={48}
                      className="opacity-80"
                    />
                  </div>
                  <h2 className="text-sm font-bold text-brand-yellow uppercase tracking-wider whitespace-pre-line">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 italic leading-relaxed">
                  {category.subtitle}
                </p>
                <div className="border-t border-brand-purple/20 mt-4"></div>
              </div>

              {/* Services List */}
              <div className="space-y-4">
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    id={service.id}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                        <Image
                          src={service.iconUrl}
                          alt={service.title}
                          width={40}
                          height={40}
                          className="opacity-70"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-medium text-brand-yellow leading-tight">
                          {service.title}
                        </h3>
                        {service.description && (
                          <p className="text-xs text-neutral-400 leading-relaxed">
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl border border-brand-purple/30 bg-brand-purple/10 p-8 md:p-12">
            <h2 className="text-2xl font-semibold text-brand-yellow mb-4">
              Ready for liftoff?
            </h2>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Get a custom quote tailored to your needs, or reach out to discuss your project.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/intake"
                className="rounded-full bg-brand-yellow px-6 py-3 text-sm font-semibold text-brand-bg hover:bg-brand-yellow/90 transition-colors"
              >
                Quote Your Launch
              </Link>
              <Link
                href="/#contact"
                className="rounded-full border border-brand-purple/50 bg-brand-purple/10 px-6 py-3 text-sm font-semibold text-brand-yellow hover:bg-brand-purple/20 transition-colors"
              >
                Make Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
