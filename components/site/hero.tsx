"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const contentTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedTimerRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show logo after 1 second
    const logoTimer = setTimeout(() => {
      setLogoVisible(true);
    }, 1000);

    // Smooth scroll handler using requestAnimationFrame
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          const currentScrollY = scrollYRef.current;
          
          // Directly update background transform without state update for smoother performance
          if (bgRef.current) {
            const parallaxOffset = currentScrollY * 0.3; // Reduced multiplier for smoother effect
            bgRef.current.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
          }
          
          if (currentScrollY > 50) {
            setHasScrolled(true);
            // Only start the timer once when scrolling is first detected
            if (!hasStartedTimerRef.current) {
              hasStartedTimerRef.current = true;
              // Delay content visibility until after logo fades out (700ms transition duration + additional delay)
              contentTimerRef.current = setTimeout(() => {
                setContentVisible(true);
              }, 300);
            }
          } else {
            setHasScrolled(false);
            setContentVisible(false);
            hasStartedTimerRef.current = false;
            // Clear timer if scrolling back up
            if (contentTimerRef.current) {
              clearTimeout(contentTimerRef.current);
              contentTimerRef.current = null;
            }
          }
          
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      clearTimeout(logoTimer);
      if (contentTimerRef.current) {
        clearTimeout(contentTimerRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-[200vh] md:h-[150vh] overflow-hidden -mt-[69px] pt-[69px]">
      {/* Background image with parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/hero-bg-vert.jpg)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Gradient overlay to blend bottom into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg" />
      {/* Logo - absolutely centered */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out translate-y-[-22rem] md:translate-y-[calc(-21rem+69px)] ${
          logoVisible && !hasScrolled
            ? "opacity-100" 
            : "opacity-0"
        }`}
      >
        <Image
          src="/combination_mark.svg"
          alt="JustInception Studio"
          width={2400}
          height={1200}
          className="h-auto w-full max-w-xl px-5"
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-end gap-16 px-5 mt-[55vh] md:mt-0 pb-2 md:pb-0 md:-mb-32">
        
        {/* Existing content grid */}
        <div 
          className={`grid w-full gap-10 lg:grid-cols-2 lg:items-center transition-all duration-700 ease-out ${
            contentVisible 
              ? "opacity-100 md:translate-y-0 translate-y-0 pointer-events-auto" 
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple">
            JustInception Studio
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-brand-yellow sm:text-5xl">
            Design + Dev that launches fast—without sacrifice.
          </h1>
          <p className="mt-4 max-w-prose text-base leading-7 text-neutral-300">
            I blend design, development, and AI-driven speed to help your brand
            lift off with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/intake"
              className="rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-bg hover:bg-brand-yellow/90 transition-colors"
            >
              Quote Your Launch
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-brand-purple/50 bg-brand-purple/10 px-5 py-2.5 text-sm font-semibold text-brand-yellow hover:bg-brand-purple/20 transition-colors"
            >
              Make Contact
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-6">
          <div className="space-y-4">
            <div className="rounded-xl border border-brand-purple/30 bg-brand-purple/10 p-4">
              <p className="text-sm font-semibold text-brand-yellow">What I do</p>
              <ul className="mt-2 space-y-2 text-sm text-neutral-300">
                <li>• Logo + branding</li>
                <li>• Web applications</li>
                <li>• Integrations and API connections</li>
              </ul>
            </div>
            <div className="rounded-xl border border-brand-purple/30 bg-brand-purple/10 p-4">
              <p className="text-sm font-semibold text-brand-yellow">Typical deliverables</p>
              <p className="mt-2 text-sm leading-6 text-neutral-300">
                Landing pages, marketing sites, client portals, Next.js apps, and
                performance/SEO cleanup.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
