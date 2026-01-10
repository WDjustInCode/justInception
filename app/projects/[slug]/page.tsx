import { notFound } from "next/navigation";
import Image from "next/image";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import CompactSection from "@/components/projects/compact-section";
import ProjectHeader from "@/components/projects/project-header";
import ProjectSites from "@/components/projects/project-sites";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const primarySite = project.sites.find((site) => site.isPrimary) || project.sites[0];
  const additionalSites = project.sites.filter((site) => site !== primarySite);

  return (
    <>
      {/* Project Name (only if no combination mark) */}
      <CompactSection eyebrow="" title="">
        <ProjectHeader project={project} />
      </CompactSection>

      {/* Branding: Logo Mark, Combination Mark, Brand Colors */}
      {(project.logoMark || project.combinationMark || (project.brandColors && project.brandColors.length > 0)) && (
        <CompactSection eyebrow="" title="">
          <div className="flex flex-col gap-10">
            {/* Logo Marks */}
            {(project.logoMark || project.combinationMark) && (
              <div className="flex flex-col items-start gap-4">
                {project.logoMark && (
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24" style={{ minHeight: '80px' }}>
                    <Image
                      src={project.logoMark}
                      alt={`${project.title} Logo Mark`}
                      fill
                      className="object-contain"
                      sizes="96px"
                      priority
                    />
                  </div>
                )}
                {project.combinationMark && (
                  <div className="relative w-full max-w-[400px] h-20 sm:h-24" style={{ minHeight: '80px' }}>
                    <Image
                      src={project.combinationMark}
                      alt={`${project.title} Combination Mark`}
                      fill
                      className="object-contain object-left"
                      sizes="400px"
                      priority
                    />
                  </div>
                )}
              </div>
            )}

            {/* Brand Colors */}
            {project.brandColors && project.brandColors.length > 0 && (
              <div>
                <div className="flex flex-nowrap gap-2">
                  {project.brandColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1.5 shrink-0"
                      style={{ minWidth: '80px' }}
                    >
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-brand-purple/30 shadow-md"
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                      <div>
                        <p className="text-xs font-medium text-brand-yellow">{color.name}</p>
                        <p className="text-[10px] text-neutral-400 font-mono">{color.hex.toUpperCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CompactSection>
      )}

      {/* About This Project: Overview, Services, Technologies */}
      {(project.overview || project.services || project.technologies) && (
        <CompactSection eyebrow="Overview" title="About This Project">
          <div className="flex flex-col gap-8">
            {/* Overview Text */}
            {project.overview && (
              <div className="text-base text-neutral-300 leading-relaxed max-w-3xl space-y-4">
                {project.overview.split('\n\n').map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            )}

            {/* Services and Technologies Grid */}
            {(project.services || project.technologies) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Services Performed */}
                {project.services && project.services.length > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple mb-3">
                      Services Performed
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-brand-purple/50 bg-brand-purple/10 px-3 py-1.5 text-xs font-medium text-brand-yellow"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Used */}
                {project.technologies && project.technologies.length > 0 && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple mb-3">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-brand-purple/50 bg-brand-purple/10 px-3 py-1.5 text-xs font-medium text-brand-yellow"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CompactSection>
      )}

      {/* Sites: Primary and Additional */}
      {project.sites.length > 0 && (
        <CompactSection eyebrow="Sites" title="Project Sites">
          <div className="flex flex-col gap-8">
            {/* Primary Site */}
            {primarySite && (
              <ProjectSites sites={project.sites} showOnlyPrimary={true} />
            )}

            {/* Additional Sites */}
            {additionalSites.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-purple mb-3">
                  Additional Sites
                </p>
                <ProjectSites sites={project.sites} showOnlyPrimary={false} />
              </div>
            )}
          </div>
        </CompactSection>
      )}
    </>
  );
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | JustInception Studio`,
    description: project.description,
  };
}
