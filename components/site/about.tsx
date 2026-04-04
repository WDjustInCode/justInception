"use client";

import Image from "next/image";
import { useRef } from "react";

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section id="about" className="pb-32 sm:pb-40">
      <div className="mx-auto w-full max-w-6xl px-9">
        <div
          className="group relative mb-6 h-[600px] w-full cursor-pointer overflow-hidden rounded-2xl outline outline-[6px] outline-transparent transition-[outline-color] duration-300 hover:outline-brand-yellow"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src="/helmet-headshot-padding-0.png"
            alt="Justin headshot"
            width={600}
            height={600}
            className="absolute bottom-[25px] left-0 h-[310px] w-[269px] object-fill transition-opacity duration-300 group-hover:opacity-0"
          />
          <video
            ref={videoRef}
            src="/about.mp4"
            muted
            playsInline
            loop
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
