import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetaText } from "@/components/editorial";
import type { Article } from "@/types/content";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/features/${article.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-foreground/20">
        {article.image && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {article.category}
            </Badge>
          </div>
          <CardTitle className="text-xl md:text-2xl leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            {article.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <MetaText>By {article.author}</MetaText>
            <span className="text-border">•</span>
            <MetaText>{article.date}</MetaText>
            <span className="text-border">•</span>
            <MetaText>{article.readingTime} Min Read</MetaText>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}