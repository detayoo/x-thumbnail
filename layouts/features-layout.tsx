import { PageContainer } from "@/components/ui/page-container";
import {
  Headline,
  SectionHeader,
  Paragraph,
  MetaText,
  PullQuote,
  Caption,
  Divider,
} from "@/components/editorial";

export default function FeaturesLayout() {
  return (
    <div className="min-h-screen">
      <PageContainer className="py-16 md:py-24">
        {/* Entry Section */}
        <div className="max-w-[720px] mx-auto">
          <Headline className="mb-6 md:mb-8 text-center">
            The Geometry of Innovation
          </Headline>

          <p className="text-[18px] md:text-[20px] leading-[1.4] font-normal text-center mb-8 md:mb-12">
            How Africa's Designers are Shaping the Future
          </p>

          <div className="flex justify-center gap-4 md:gap-6 text-muted-foreground mb-12 md:mb-16">
            <MetaText>By Maya Roberts</MetaText>
            <MetaText>July 14, 2021</MetaText>
            <MetaText>8 Min Read</MetaText>
          </div>

          <Divider spacing="medium" />
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="relative">
          <div className="max-w-[720px] mx-auto space-y-[24px] md:space-y-[32px]">
            <Paragraph>
              African fashion is undergoing a remarkable transformation. In
              recent years,
              <sup className="text-[10px]">1</sup> designers across the
              continent have embraced geometric forms and innovative techniques
              that challenge conventional aesthetics.
            </Paragraph>

            <Paragraph>
              These creators are reimagining tradition, blending heritage with
              futurism in ways that speak to both local identities and global
              audiences.
              <sup className="text-[10px]">2</sup>
            </Paragraph>

            <Divider spacing="large" />

            <PullQuote className="text-center italic">
              "Innovation arises when designers dare to disrupt the familiar and
              embrace the unknown."
            </PullQuote>

            {/* Featured Image */}
            <figure className="my-12 md:my-16">
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/20525039/pexels-photo-20525039.jpeg"
                  alt="A striking blend of heritage and futurism in contemporary African design - Miguel González on Pexels"
                  className="w-full h-full object-cover"
                />
              </div>
              <Caption className="mt-4 text-center italic text-muted-foreground">
                A striking blend of heritage and futurism in contemporary
                African design.
              </Caption>
            </figure>

            <Divider spacing="large" />

            <SectionHeader className="uppercase tracking-wide mt-16 md:mt-20">
              FORM FOLLOWS CULTURAL CODE
            </SectionHeader>

            <Divider spacing="medium" />

            <Paragraph>
              Africa's design revolution is not just aesthetic, it's a statement
              of identity, resourcefulness, and resilience.
              <sup className="text-[10px]">3</sup>
            </Paragraph>

            <Paragraph>
              As the world watches, these designers are not just creating
              fashion; they are defining the future.
            </Paragraph>

            <Divider spacing="large" className="mt-16 md:mt-24" />
          </div>

          {/* Desktop Sidebar - Related Insights */}
          <aside className="hidden lg:block fixed top-1/2 -translate-y-1/2 right-[calc((100vw-1440px)/2+40px)] xl:right-[calc((100vw-1440px)/2+80px)] w-[200px]">
            <div className="border-l-2 border-foreground/10 pl-6">
              <MetaText
                as="div"
                className="font-medium mb-6 text-foreground tracking-wide"
              >
                Related Insights
              </MetaText>
              <div className="space-y-6">
                <div>
                  <MetaText as="p" className="text-foreground/70 leading-[1.6]">
                    1. Bauhaus Influence: The rise of geometric minimalism.
                  </MetaText>
                </div>
                <div>
                  <MetaText as="p" className="text-foreground/70 leading-[1.6]">
                    2. Sustainable Materials: Local resources, global impact.
                  </MetaText>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile Related Insights */}
        <div className="lg:hidden max-w-[720px] mx-auto pt-4">
          <MetaText as="div" className="font-medium mb-6 tracking-wide">
            Related Insights
          </MetaText>
          <div className="space-y-4">
            <div>
              <MetaText as="p" className="text-muted-foreground leading-[1.6]">
                1. Bauhaus Influence: The rise of geometric minimalism.
              </MetaText>
            </div>
            <div>
              <MetaText as="p" className="text-muted-foreground leading-[1.6]">
                2. Sustainable Materials: Local resources, global impact.
              </MetaText>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
