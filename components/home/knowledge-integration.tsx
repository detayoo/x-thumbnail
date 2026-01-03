import { SectionHeader, Paragraph } from "@/components/editorial";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { knowledgeSources } from "@/lib/content-data";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Database01Icon,
  Lightning,
  Globe02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return (
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          strokeWidth={2}
          className="size-4 text-green-600 pointer-events-none"
        />
      );
    case "integrated":
      return (
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          strokeWidth={2}
          className="size-4 text-blue-600 pointer-events-none"
        />
      );
    case "planned":
      return (
        <HugeiconsIcon
          icon={Clock01Icon}
          strokeWidth={2}
          className="size-4 text-amber-600 pointer-events-none"
        />
      );
    default:
      return (
        <HugeiconsIcon
          icon={Clock01Icon}
          strokeWidth={2}
          className="size-4 pointer-events-none"
        />
      );
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "api":
      return (
        <HugeiconsIcon
          icon={Lightning}
          strokeWidth={2}
          className="size-5 pointer-events-none"
        />
      );
    case "endpoint":
      return (
        <HugeiconsIcon
          icon={Globe02Icon}
          strokeWidth={2}
          className="size-5 pointer-events-none"
        />
      );
    case "database":
      return (
        <HugeiconsIcon
          icon={Database01Icon}
          strokeWidth={2}
          className="size-5 pointer-events-none"
        />
      );
    default:
      return (
        <HugeiconsIcon
          icon={Database01Icon}
          strokeWidth={2}
          className="size-5 pointer-events-none"
        />
      );
  }
};

export function KnowledgeIntegration() {
  return (
    <section id="knowledge-integration" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <SectionHeader className="mb-4 uppercase tracking-wide">
            Open Knowledge Integration
          </SectionHeader>
          <Paragraph className="text-lg text-muted-foreground">
            We believe in democratizing access to knowledge. Our platform is
            designed to integrate with open-source endpoints like Kiwix,
            enabling offline access to vast knowledge bases including Wikipedia,
            Stack Exchange, and more.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {knowledgeSources.map((source) => (
            <Card key={source.name} className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {getTypeIcon(source.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(source.status)}
                    <Badge
                      variant={
                        source.status === "active" ? "default" : "outline"
                      }
                      className="text-xs"
                    >
                      {source.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{source.name}</CardTitle>
                <CardDescription>{source.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-2 bg-card">
            <CardHeader>
              <CardTitle className="text-xl">Why Open Knowledge?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-5 text-green-600 flex-shrink-0 mt-0.5 pointer-events-none"
                />
                <div>
                  <p className="font-medium mb-1">Offline Access</p>
                  <p className="text-sm text-muted-foreground">
                    Access comprehensive knowledge bases without internet
                    connectivity through Kiwix integration
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-5 text-green-600 flex-shrink-0 mt-0.5 pointer-events-none"
                />
                <div>
                  <p className="font-medium mb-1">Related Context</p>
                  <p className="text-sm text-muted-foreground">
                    Every article can surface related Wikipedia entries,
                    technical documentation, and community insights
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-5 text-green-600 flex-shrink-0 mt-0.5 pointer-events-none"
                />
                <div>
                  <p className="font-medium mb-1">Community Driven</p>
                  <p className="text-sm text-muted-foreground">
                    Leverage the collective intelligence of open-source
                    communities and knowledge repositories
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  strokeWidth={2}
                  className="size-5 text-green-600 flex-shrink-0 mt-0.5 pointer-events-none"
                />
                <div>
                  <p className="font-medium mb-1">Free & Accessible</p>
                  <p className="text-sm text-muted-foreground">
                    No paywalls, no restrictions—knowledge should be freely
                    available to all
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
