"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { CollateralGroup, CollateralItem } from "@/lib/projects";

const PdfViewer = dynamic(() => import("./pdf-viewer"), { ssr: false });

function isVideo(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function isPdf(src: string) {
  return /\.pdf$/i.test(src);
}

interface Props {
  groups: CollateralGroup[];
}

export default function ProjectCollateral({ groups }: Props) {
  const [selected, setSelected] = useState<CollateralItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openLightbox(item: CollateralItem) {
    setSelected(item);
    dialogRef.current?.showModal();
  }

  function closeLightbox() {
    dialogRef.current?.close();
    setSelected(null);
  }

  function handleDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) closeLightbox();
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple mb-4">
              {group.group}
            </p>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {(group.items ?? []).map((item) => (
                <div
                  key={item.src}
                  className="break-inside-avoid mb-4 cursor-pointer group"
                  onClick={() => openLightbox(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openLightbox(item);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${item.label ?? item.alt}`}
                >
                  <div className="rounded-xl overflow-hidden border border-brand-blue/30 bg-brand-blue/10 p-3 transition-colors duration-200 group-hover:border-brand-purple/60">
                    {isPdf(item.src) ? (
                      <div className="flex flex-col items-center justify-center gap-3 py-8 px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-brand-purple/60"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="9" y1="13" x2="15" y2="13" />
                          <line x1="9" y1="17" x2="15" y2="17" />
                        </svg>
                        <span className="text-xs text-neutral-400 text-center">
                          Click to view PDF
                        </span>
                      </div>
                    ) : isVideo(item.src) ? (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    ) : (
                      <div className={item.whiteBg ? "bg-white rounded-lg" : undefined}>
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={item.span === "tall" ? 1100 : 600}
                          className="w-full h-auto object-contain"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                  </div>
                  {item.label && (
                    <p className="mt-1.5 text-xs text-neutral-400 pl-1">
                      {item.label}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="m-auto bg-transparent p-0 max-w-4xl w-full backdrop:bg-[#03040a]/80 backdrop:backdrop-blur-sm"
        onClick={handleDialogClick}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="relative">
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-10 rounded-full bg-[#03040a]/70 p-1.5 text-neutral-300 hover:text-brand-yellow transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="bg-brand-blue/10 rounded-2xl p-3">
              {isPdf(selected.src) ? (
                <PdfViewer key={selected.src} src={selected.src} />
              ) : isVideo(selected.src) ? (
                <video
                  src={selected.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-auto object-contain max-h-[80vh] rounded-lg"
                />
              ) : (
                <div className={selected.whiteBg ? "bg-white rounded-xl" : undefined}>
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-contain max-h-[80vh]"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              )}
            </div>
            {selected.label && (
              <p className="mt-3 text-sm text-neutral-300 text-center">
                {selected.label}
              </p>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
