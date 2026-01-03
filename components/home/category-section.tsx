import { SectionHeader, Paragraph } from "@/components/editorial";
import { ArticleCard } from "./article-card";
import type { Category } from "@/types/content";
import { Button } from "@/components/ui/button";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface CategorySectionProps {
  category: Category;
}

export function CategorySection({ category }: CategorySectionProps) {
  const Icon = category.icon;

  return (
    <section id={category.id} className="py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-start gap-4 mb-8 md:mb-12">
          <div className={`${category.color} shrink-0`}>
            <Icon className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <div className="flex-1">
            <SectionHeader className="mb-3 uppercase tracking-wide">
              {category.name}
            </SectionHeader>
            <Paragraph className="text-muted-foreground max-w-2xl">
              {category.description}
            </Paragraph>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {category.articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button variant="ghost" className="group" asChild>
            <Link href={`/category/${category.id}`}>
              View all {category.name} articles
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                strokeWidth={2}
                className="text-muted-foreground size-4 pointer-events-none"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
