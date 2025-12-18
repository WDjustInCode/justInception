"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const CTA_URL = "https://quote.justinception.studio/intake";

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedTimerRef = useRef(false);

  useEffect(() => {
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

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      if (headerTimerRef.current) {
        clearTimeout(headerTimerRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-700 ${
        headerVisible 
          ? "opacity-100 border-b border-brand-blue/20 bg-brand-bg/20 backdrop-blur pointer-events-auto" 
          : "opacity-0 border-b-0 bg-transparent backdrop-blur-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
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

        <nav className="hidden items-center gap-20 sm:flex">
          <Link href="/" className="text-sm text-neutral-300 hover:text-brand-yellow transition-colors">
            Home
          </Link>
          <Link
            href="/services"
            className="text-sm text-neutral-300 hover:text-brand-yellow transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-neutral-300 hover:text-brand-yellow transition-colors"
          >
            Contact
          </Link>
        </nav>

        <a
          href={CTA_URL}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-brand-yellow px-4 py-2 text-sm font-semibold text-brand-bg hover:bg-brand-yellow/90 transition-colors"
        >
          Quote Your Launch
        </a>
      </div>
    </header>
  );
}
