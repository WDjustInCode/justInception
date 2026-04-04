import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const {
    slug,
    title,
    logoMark,
    combinationMark,
    brandColors = [],
    services = [],
  } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className="outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <div className="w-[290px] md:w-[345px] rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-3 shadow-sm">
        {/* Visual identity block */}
        <div className="rounded-xl border border-brand-purple/20 overflow-hidden bg-[#03040a]">
          {/* Combination mark / logomark / title fallback */}
          <div className="relative aspect-[4/3]">
            {combinationMark ? (
              <Image
                src={combinationMark}
                alt={title}
                fill
                className="object-contain p-6"
                sizes="360px"
              />
            ) : logoMark ? (
              <Image
                src={logoMark}
                alt={title}
                fill
                className="object-contain p-10"
                sizes="360px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <p className="text-center text-sm font-semibold text-neutral-300">
                  {title}
                </p>
              </div>
            )}
          </div>

          {/* Brand color swatches — always rendered to keep consistent card height */}
          <div className="flex h-[30px] items-center gap-1.5 px-3">
            {brandColors.map((c) => (
              <div
                key={c.name}
                title={c.name}
                className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-brand-yellow">{title}</p>
            {logoMark && combinationMark && (
              <div className="relative h-5 w-5 shrink-0">
                <Image src={logoMark} alt="" fill className="object-contain" />
              </div>
            )}
          </div>
          {services.length > 0 && (
            <p className="line-clamp-1 text-[10px] leading-relaxed text-neutral-500">
              {services.join(" · ")}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
