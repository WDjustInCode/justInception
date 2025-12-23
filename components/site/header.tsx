"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const CTA_URL = "https://quote.justinception.studio/intake";

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
        iconUrl: '/noun-moon-rocket.svg', // 🚀 Rocket on launch pad
        href: '/services#primary-systems',
      },
      {
        id: 'flight-systems',
        title: 'Flight Systems Engineering',
        description: 'Web apps, SaaS platforms, and interactive tools',
        iconUrl: '/noun-sattelite.svg', // 🛰️ Satellite with solar panels
        href: '/services#flight-systems',
      },
      {
        id: 'interface-navigation',
        title: 'Interface & Navigation Design',
        description: 'UI/UX design and user-centered experiences',
        iconUrl: '/noun-big-dipper.svg', // 🗺️ Constellation diagram
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
        iconUrl: '/noun-space-rocket.svg', // 🚀 Rocket lifting off with smoke
        href: '/services#launch-optimization',
      },
      {
        id: 'signal-calibration',
        title: 'Signal Calibration',
        description: 'Analytics setup and tracking implementation',
        iconUrl: '/noun-telescope.svg', // 📡 Ground-based satellite dish (telescope analogy)
        href: '/services#signal-calibration',
      },
      {
        id: 'systems-tuning',
        title: 'Systems Tuning',
        description: 'Speed optimization and technical improvements',
        iconUrl: '/noun-comet.svg', // ☄️ Comet with motion lines
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
        iconUrl: '/noun-sattelite-2.svg', // 🪐 Satellite (closest to planet with rings)
        href: '/services#instrumentation-docking',
      },
      {
        id: 'analytics-crm',
        title: 'Analytics, CRM, Payments',
        description: 'Business tools and dashboards',
        iconUrl: '/noun-black-hole.svg', // 🌀 Spiral galaxy (complex data systems)
        href: '/services#analytics-crm',
      },
      {
        id: 'automation-reporting',
        title: 'Automation & Reporting',
        description: 'Workflow automation and data pipelines',
        iconUrl: '/noun-check-list.svg', // Checklist for automation
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
        iconUrl: '/noun-moon.svg', // 🌙 Crescent moon
        href: '/services#guidance-feedback',
      },
      {
        id: 'motion-design',
        title: 'Motion Design',
        description: 'Custom animations and transitions',
        iconUrl: '/noun-space-rocket-2.svg', // Rocket variant for motion
        href: '/services#motion-design',
      },
      {
        id: 'micro-interactions',
        title: 'Micro-interactions & UI Polish',
        description: 'Delightful details and refined experiences',
        iconUrl: '/noun-astronaut-on-moon.svg', // 🧑‍🚀 Astronaut planting flag (visual identity)
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
        iconUrl: '/noun-astronaut-in-space.svg', // 🧑‍🚀 Floating astronaut
        href: '/services#mission-sustainment',
      },
      {
        id: 'updates-fixes',
        title: 'Updates, Fixes, Monitoring',
        description: 'Bug fixes, security updates, and uptime',
        iconUrl: '/noun-sattelite.svg', // Satellite monitoring
        href: '/services#updates-fixes',
      },
      {
        id: 'support-retainers',
        title: 'Support Blocks & Retainers',
        description: 'Dedicated support hours and priority access',
        iconUrl: '/noun-check-list.svg', // Checklist for support tasks
        href: '/services#support-retainers',
      },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  const [hasScrolled, setHasScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(!isHomePage); // Show immediately on non-home pages
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedTimerRef = useRef(false);

  useEffect(() => {
    // If not on home page, show header immediately and skip scroll logic
    if (!isHomePage) {
      setHeaderVisible(true);
      return;
    }

    // Home page scroll logic
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
        // Only start the timer once when scrolling is first detected
        if (!hasStartedTimerRef.current) {
          hasStartedTimerRef.current = true;
          // Delay header visibility to match content fade-in timing (600ms)
          headerTimerRef.current = setTimeout(() => {
            setHeaderVisible(true);
          }, 300);
        }
      } else {
        setHasScrolled(false);
        setHeaderVisible(false);
        hasStartedTimerRef.current = false;
        // Clear timer if scrolling back up
        if (headerTimerRef.current) {
          clearTimeout(headerTimerRef.current);
          headerTimerRef.current = null;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      if (headerTimerRef.current) {
        clearTimeout(headerTimerRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-700 ${
        headerVisible 
          ? "opacity-100 border-b border-brand-blue/20 bg-brand-bg/20 backdrop-blur pointer-events-auto" 
          : "opacity-0 border-b-0 bg-transparent backdrop-blur-0 pointer-events-none"
      }`}
      style={{ willChange: 'opacity' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-9 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src="/logo_mark.svg"
              alt="JustInception Studio"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop Services Dropdown and Buttons */}
          <div 
            className="hidden md:block relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href="/services"
              className="text-sm text-neutral-300 hover:text-brand-yellow transition-colors flex items-center gap-1"
              onClick={() => setIsDropdownOpen(false)}
            >
              Service Modules
              <span className={`text-[10px] opacity-70 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </Link>
            
            {isDropdownOpen && (
              <div className="fixed left-1/2 -translate-x-1/2 top-[72px] w-[1200px] max-w-[95vw] mx-auto bg-brand-bg/95 backdrop-blur-xl border border-brand-purple/30 rounded-2xl shadow-2xl p-8 animate-fadeIn">
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-6">
                  {serviceCategories.map((category) => (
                    <div key={category.title} className="flex flex-col">
                      <div className="min-h-[120px] flex flex-col justify-between">
                        <div>
                          <div className="flex items-start gap-2.5 mb-1">
                            <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center">
                              <Image
                                src={category.iconUrl}
                                alt={category.title}
                                width={44}
                                height={44}
                                className="opacity-80"
                                priority
                              />
                            </div>
                            <h3 className="text-xs font-bold text-brand-yellow uppercase tracking-wider whitespace-pre-line">
                              {category.title}
                            </h3>
                          </div>
                          <p className="text-xs text-neutral-500 italic leading-relaxed">
                            {category.subtitle}
                          </p>
                        </div>
                        <div className="border-t border-brand-purple/20 mt-3"></div>
                      </div>
                      <div className="flex flex-col gap-2 pt-3">
                        {category.services.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href || '/services'}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-brand-purple/10 transition-colors group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                              <Image
                                src={service.iconUrl}
                                alt={service.title}
                                width={36}
                                height={36}
                                className="opacity-70 group-hover:opacity-100 transition-opacity"
                                priority
                              />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-medium text-brand-yellow group-hover:text-brand-yellow/90 transition-colors leading-tight">
                                {service.title}
                              </span>
                              {service.description && (
                                <span className="text-[10px] text-neutral-400 leading-relaxed">
                                  {service.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#contact"
            className="hidden md:block rounded-full border border-brand-purple/50 bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-yellow hover:bg-brand-purple/20 transition-colors"
          >
            Make Contact
          </Link>
          <a
            href="/intake"
            target="_blank"
            rel="noopener"
            className="hidden md:block rounded-full bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-bg hover:bg-brand-yellow/90 transition-colors"
          >
            Quote Your Launch
          </a>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 text-brand-yellow hover:text-brand-yellow/80 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-brand-bg/98 backdrop-blur-xl border-b border-brand-purple/30 shadow-2xl md:hidden">
            <nav className="flex flex-col gap-4 p-6">
              <Link
                href="/services"
                className="text-base text-neutral-300 hover:text-brand-yellow transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Service Modules
              </Link>
              
              <div className="border-t border-brand-purple/20 my-2"></div>
              
              <Link
                href="/#contact"
                className="rounded-full border border-brand-purple/50 bg-brand-purple/10 px-5 py-3 text-sm font-semibold text-brand-yellow hover:bg-brand-purple/20 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Make Contact
              </Link>
              
              <a
                href="/intake"
                target="_blank"
                rel="noopener"
                className="rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-bg hover:bg-brand-yellow/90 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Quote Your Launch
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
