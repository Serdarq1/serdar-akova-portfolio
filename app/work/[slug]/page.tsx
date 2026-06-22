import { notFound } from "next/navigation";
import { getProject, projectSlugs } from "@/data/projects";
import ProjectPage from "@/components/ProjectPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
