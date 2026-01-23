"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Section from "./section";

type Card = {
  title: string;
  description: string;
  image?: string;
  video?: string;
  poster?: string;
};

const cards: Card[] = [
  {
    title: "Chart a Course",
    description:
      "Brand direction, design systems, and the build plan that makes shipping predictable.",
    video: "/grok-video-telescope.mp4"
  },
  {
    title: "Launch Sequence",
    description:
      "Design + development execution: pages, interactions, performance, deployment.",
    video: "/grok-video-rocket-ship.mp4"
  },
  {
    title: "Ground Control",
    description:
      "Ongoing support, updates, and optimization to keep your brand thriving post-launch.",
    video: "/grok-control-video.mp4"
  },
];

function VideoWithPoster({ video, poster, title }: { video: string; poster?: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(poster || null);
  const [hasTriedGenerate, setHasTriedGenerate] = useState(false);

  useEffect(() => {
    // If static poster is provided, use it
    if (poster) {
      setPosterUrl(poster);
      return;
    }

    const videoEl = videoRef.current;
    if (!videoEl || hasTriedGenerate) return;

    const generatePoster = () => {
      try {
        if (posterUrl) return; // Already have a poster
        
        const canvas = document.createElement("canvas");
        const width = videoEl.videoWidth;
        const height = videoEl.videoHeight;
        
        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          
          if (ctx) {
            ctx.drawImage(videoEl, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            setPosterUrl(dataUrl);
            setHasTriedGenerate(true);
          }
        }
      } catch (error) {
        console.error("Error generating poster:", error);
      }
    };

    const attemptGenerate = () => {
      if (videoEl.readyState >= 2 && videoEl.videoWidth > 0 && videoEl.videoHeight > 0) {
        // Video has dimensions, try to capture frame
        if (videoEl.currentTime === 0) {
          videoEl.currentTime = 0.01;
        } else {
          generatePoster();
        }
      }
    };

    const handleLoadedMetadata = () => {
      attemptGenerate();
    };

    const handleLoadedData = () => {
      attemptGenerate();
    };

    const handleSeeked = () => {
      if (!posterUrl && videoEl.readyState >= 2) {
        generatePoster();
      }
    };

    const handleCanPlay = () => {
      attemptGenerate();
    };

    // Try to load video metadata immediately
    if (videoEl.readyState >= 1) {
      attemptGenerate();
    }

    // Listen for various events
    videoEl.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoEl.addEventListener("loadeddata", handleLoadedData);
    videoEl.addEventListener("seeked", handleSeeked);
    videoEl.addEventListener("canplay", handleCanPlay);

    // Force load on iOS by setting currentTime (triggers metadata load)
    videoEl.load();

    return () => {
      videoEl.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoEl.removeEventListener("loadeddata", handleLoadedData);
      videoEl.removeEventListener("seeked", handleSeeked);
      videoEl.removeEventListener("canplay", handleCanPlay);
    };
  }, [video, poster, posterUrl, hasTriedGenerate]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="metadata"
      poster={posterUrl || undefined}
      className="w-full h-full object-contain"
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}

export default function ServicesPreview() {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };
  return (
    <Section eyebrow="how it works" title="Mission Protocol">
      <div className="flex items-end justify-between gap-6">
        <p className="max-w-prose text-sm leading-6 text-neutral-300">
          A simple, repeatable framework: plan your mission, execute the launch,
          then maintain course.
        </p>
        <Link
          href="/services"
          className="hidden rounded-full border border-brand-purple/50 bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-yellow hover:bg-brand-purple/20 transition-colors sm:inline-flex"
        >
          Service Modules
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-6 shadow-sm"
          >
            {c.image && (
              <div className="relative w-full aspect-square bg-brand-bg border-4 border-transparent hover:border-brand-yellow rounded-lg overflow-hidden mb-4 flex items-center justify-center transition-colors duration-300">
                <Image
                  src={c.image}
                  alt={c.title}
                  width={400}
                  height={400}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            )}
            {c.video && (
              <div 
                className="relative w-full aspect-square bg-brand-bg border-4 border-transparent hover:border-brand-yellow rounded-lg overflow-hidden mb-4 transition-colors duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <VideoWithPoster video={c.video} poster={c.poster} title={c.title} />
              </div>
            )}
            <h3 className="text-lg font-semibold tracking-tight text-brand-yellow">{c.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-300">
              {c.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/services"
          className="inline-flex w-full items-center justify-center rounded-full border border-brand-purple/50 bg-brand-purple/10 px-4 py-2 text-sm font-semibold text-brand-yellow hover:bg-brand-purple/20 transition-colors"
        >
          Service Modules
        </Link>
      </div>
    </Section>
  );
}
