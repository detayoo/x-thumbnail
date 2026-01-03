export interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime: string;
  slug: string;
  image?: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  articles: Article[];
  url?: string;
}

export interface KnowledgeSource {
  name: string;
  description: string;
  url: string;
  type: "api" | "endpoint" | "database";
  status: "active" | "planned" | "integrated";
}