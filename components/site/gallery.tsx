import Section from "./section";
import ProjectCard from "./project-card";
import { getAllProjects } from "@/lib/projects";

export default function Gallery() {
  const projects = getAllProjects();

  return (
    <Section eyebrow="Portfolio" title="Recent Missions">
      <div className="flex flex-wrap justify-start gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
