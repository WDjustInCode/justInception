"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Add animation styles on client side only
    if (!document.getElementById('slide-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'slide-animation-styles';
      style.textContent = `
        @keyframes slideHorizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(calc(100% - 14rem));
          }
        }
        .slide-animation {
          animation: slideHorizontal 8s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <section id="about" className="py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl px-9">
        <div className="relative mb-6 h-56 w-full overflow-hidden">
          <div className="absolute w-full slide-animation">
            <Image
              src="/helmet-headshot-padding-0.png"
              alt="Justin headshot"
              width={600}
              height={600}
              className="h-56 w-56 object-contain"
            />
          </div>
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
            <a 
              href="https://www.linkedin.com/in/justin-blocker-82942463/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-semibold text-brand-bg hover:bg-brand-yellow/90 transition-colors"
            >
              My LinkedIn
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
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
