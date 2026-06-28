import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailView from "@/components/portfolio/ProjectDetailView";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/components/portfolio/projectsData";
import { SITE_TITLE, SITE_URL } from "@/components/portfolio/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.title} | Project`;
  const description = project.seoDescription ?? project.tagline;

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${title} | ${SITE_TITLE}`,
      description,
      url: `${SITE_URL.replace(/\/$/, "")}/projects/${slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}
