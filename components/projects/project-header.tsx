import { Project } from "@/lib/projects";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  // Only show project name if no combination mark exists
  if (!project.combinationMark) {
    return (
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brand-yellow">
        {project.title}
      </h1>
    );
  }
  
  return null;
}
