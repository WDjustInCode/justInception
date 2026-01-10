import { ProjectSite, getFrameworkLabel, getSiteTypeLabel } from "@/lib/projects";

interface ProjectSitesProps {
  sites: ProjectSite[];
  showOnlyPrimary?: boolean;
}

export default function ProjectSites({ sites, showOnlyPrimary = false }: ProjectSitesProps) {
  if (sites.length === 0) return null;

  const primarySite = sites.find((site) => site.isPrimary) || sites[0];
  const otherSites = sites.filter((site) => site !== primarySite);

  if (showOnlyPrimary) {
    return (
      <div className="rounded-xl border border-brand-blue/30 bg-brand-blue/10 p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-lg font-semibold text-brand-yellow">
                {primarySite.name}
              </h3>
              <span className="text-[10px] font-medium uppercase tracking-wider text-brand-purple bg-brand-purple/20 px-2 py-0.5 rounded shrink-0">
                Primary
              </span>
            </div>
            <p className="text-xs text-neutral-300 mb-2">
              {getSiteTypeLabel(primarySite.type)} • {getFrameworkLabel(primarySite.framework)}
            </p>
            {primarySite.description && (
              <p className="text-xs text-neutral-400">{primarySite.description}</p>
            )}
          </div>
          {primarySite.url && (
            <a
              href={primarySite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-brand-purple hover:text-brand-yellow transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-xs font-medium">Visit</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {otherSites.map((site, index) => (
        <div
          key={index}
          className="rounded-lg border border-brand-purple/20 bg-brand-purple/5 p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <h5 className="text-sm font-semibold text-brand-yellow">
                  {site.name}
                </h5>
                {site.type === 'in-house' && (
                  <svg className="w-3.5 h-3.5 text-brand-purple shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
              </div>
              <p className="text-[10px] text-neutral-400 mb-1.5">
                {getSiteTypeLabel(site.type)} • {getFrameworkLabel(site.framework)}
              </p>
              {site.description && (
                <p className="text-[10px] text-neutral-500">{site.description}</p>
              )}
            </div>
            {site.url && (
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple hover:text-brand-yellow transition-colors shrink-0"
                aria-label={`Visit ${site.name}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
