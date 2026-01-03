import { MetaText, Paragraph, SectionHeader } from "../editorial";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { categories } from "@/lib/content-data";

export function FeaturedSection() {
  const featuredArticles = [
    categories[0]?.articles[0],
    categories[1]?.articles[0],
    categories[4]?.articles[0],
  ];

  return (
    <section className="py-20 border-t border-border" id="featured">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Featured Reads
          </Badge>
          <SectionHeader className="mb-4">
            Handpicked Stories This Month
          </SectionHeader>
          <Paragraph className="text-muted-foreground max-w-2xl mx-auto">
            Our editors' selection of the most compelling articles from across
            all categories
          </Paragraph>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <article
              key={index}
              className="group cursor-pointer border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] bg-accent overflow-hidden">
                {article?.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {article?.category}
                  </Badge>
                  <MetaText as="span" className="text-muted-foreground">
                    {article?.readingTime} min read
                  </MetaText>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {article?.title}
                </h3>
                <Paragraph className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {article?.description}
                </Paragraph>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-accent" />
                    <div>
                      <MetaText
                        as="p"
                        className="text-sm font-medium text-foreground"
                      >
                        {article?.author}
                      </MetaText>
                      <MetaText
                        as="p"
                        className="text-xs text-muted-foreground"
                      >
                        {article?.date}
                      </MetaText>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="group-hover:bg-primary/5"
                  >
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Featured
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
