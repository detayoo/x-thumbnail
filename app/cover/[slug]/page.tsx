import { CoverGenerator } from "@/components/cover-generator";
import { categories } from "@/lib/content-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface CoverPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CoverPageProps): Promise<Metadata> {
  const { slug } = await params;
  const allArticles = categories.flatMap((category) => category.articles);
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Cover Not Found",
    };
  }

  return {
    title: `${article.title} - Cover`,
    description: `Cover page for ${article.title}`,
  };
}

export async function generateStaticParams() {
  const allArticles = categories.flatMap((category) => category.articles);
  
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleCoverPage({ params }: CoverPageProps) {
  const { slug } = await params;
  
  // Find the article by slug
  const allArticles = categories.flatMap((category) => category.articles);
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <CoverGenerator title={article.title} />;
}