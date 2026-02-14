import { Headline, Paragraph } from "@/components/editorial";
import { Button } from "@/components/ui/button";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function HeroSection() {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById("engineering");
    categoriesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-20 text-center">
        <Headline className="mb-6 md:mb-8 max-w-5xl mx-auto">
          an all-round magazine for the curious mind
        </Headline>

        <Paragraph className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12">
          you may ask, why not google? you could, and you'd get a thousand
          pages, but maybe not as connected as you'd like. this is more like a
          continuous read. you're exploring a curated network, not junks, useful
          information.
        </Paragraph>

        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">1</p>
            <p className="text-sm text-muted-foreground">category</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">50+</p>
            <p className="text-sm text-muted-foreground">articles</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">100%</p>
            <p className="text-sm text-muted-foreground">original content</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold mb-2">∞</p>
            <p className="text-sm text-muted-foreground">open knowledge</p>
          </div>
        </div>
      </div>
    </section>
  );
}
