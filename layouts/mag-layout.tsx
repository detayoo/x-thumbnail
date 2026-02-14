import { PageContainer } from "@/components/ui/page-container";
import {
  EntryFrame,
  TransitionState,
  ReadingFlow,
  SectionHeader,
  Paragraph,
  PullQuote,
  DisruptionBlock,
  ClosingSection,
  MetaFooter,
  Caption,
} from "@/components/editorial";
import Image from "next/image";

export default function MagLayout() {
  return (
    <PageContainer withPadding={false}>
      <EntryFrame
        headline="The Art of Editorial Design"
        subheading="Exploring the intersection of typography, rhythm, and digital publishing"
        author="Editorial Team"
        date="January 1, 2026"
        readingTime="8"
      />

      <TransitionState spacing="large" />

      <ReadingFlow>
        <SectionHeader>Introduction to Editorial Excellence</SectionHeader>

        <Paragraph>
          In the realm of digital publishing, typography is not merely a vessel
          for content—it is the architecture of reading itself. The choice of
          typeface, the calibration of line height, the subtle dance of tracking
          and kerning: these decisions shape how ideas flow from page to mind.
        </Paragraph>

        <Paragraph>
          ITC Avant Garde, with its geometric precision and modernist heritage,
          offers a foundation for editorial clarity. When deployed with
          discipline—constraining variation to weight, size, and spacing—it
          creates a system that is both flexible and coherent.
        </Paragraph>

        <SectionHeader>The Typography System</SectionHeader>

        <Paragraph>
          Our editorial framework constrains choice to amplify impact. Seven
          typographic components—Headline, SectionHeader, Paragraph, MetaText,
          PullQuote, Caption, and DisruptionText—form a complete vocabulary for
          editorial expression.
        </Paragraph>

        <Paragraph>
          Each component is self-contained, responsive by design, and
          composable. This modularity ensures consistency across devices while
          preserving editorial intent. The system is deterministic: given the
          same content, it will always render the same rhythm.
        </Paragraph>

        <PullQuote>
          Typography is the interface—if type fails, the experience fails.
        </PullQuote>

        <SectionHeader>Vertical Rhythm and Spacing</SectionHeader>

        <Paragraph>
          Vertical rhythm is not decoration; it is the heartbeat of reading. Our
          system enforces consistent spacing between elements: 48px on desktop,
          24px on mobile. This creates a predictable flow that guides the eye
          without conscious effort.
        </Paragraph>

        <Paragraph>
          Spacing tokens are not arbitrary. Page margins expand from 16px on
          mobile to 160px on desktop, creating a focused column of 720px that
          optimizes readability. The container never exceeds 1440px, ensuring
          content remains centered and legible even on large displays.
        </Paragraph>

        <figure className="my-8">
          <div className="aspect-video bg-muted rounded-sm flex items-center justify-center">
            <span className="text-muted-foreground">Figure Placeholder</span>
          </div>
          <Caption className="mt-3 text-muted-foreground">
            Figure 1: The editorial grid system demonstrating column width and
            vertical rhythm
          </Caption>
        </figure>

        <SectionHeader>The Role of Disruption</SectionHeader>

        <Paragraph>
          Editorial systems must breathe. The DisruptionText component—used
          sparingly, perhaps once per article—creates moments of emphasis that
          break the reading rhythm intentionally. These are earned
          interruptions, not casual asides.
        </Paragraph>

        <Paragraph>
          Similarly, PullQuotes should be sparse. Consecutive pull quotes dilute
          their impact. When deployed with restraint, they become landmarks in
          the reading journey, offering moments of reflection before the flow
          resumes.
        </Paragraph>
      </ReadingFlow>

      <DisruptionBlock text="Design is not what it looks like and feels like. Design is how it works." />

      <ReadingFlow>
        <SectionHeader>Implementation Philosophy</SectionHeader>

        <Paragraph>
          The system is built on React components, each adhering to the
          principle of single responsibility. Layout and vertical rhythm are
          applied outside components, ensuring that typography and structure
          remain cleanly separated.
        </Paragraph>

        <Paragraph>
          This separation creates predictability. Components can be reordered,
          removed, or duplicated without breaking the visual system. The reading
          experience remains intact regardless of content length or complexity.
        </Paragraph>

        <SectionHeader>Responsive Adaptation</SectionHeader>

        <Paragraph>
          Responsive design is not about hiding content—it's about graceful
          transformation. Our components scale fluidly: Headline drops from 64px
          to 36px, SectionHeader from 32px to 24px, maintaining proportional
          relationships across breakpoints.
        </Paragraph>

        <Paragraph>
          Mobile devices receive the same editorial experience, compressed but
          not compromised. The column width becomes fluid, margins tighten, and
          vertical spacing reduces—but the hierarchy remains clear and the
          rhythm intact.
        </Paragraph>
      </ReadingFlow>

      <TransitionState spacing="large" />

      <ClosingSection>
        <Paragraph>
          Editorial design is an exercise in constraint. By limiting
          variables—one font family, predictable spacing, componentized text—we
          create space for content to breathe and ideas to resonate.
        </Paragraph>

        <Paragraph>
          The systems that endure are not those with infinite options, but those
          with clear principles. Typography, rhythm, and structure: these are
          the foundations of digital publishing that respects both content and
          reader.
        </Paragraph>
      </ClosingSection>

      <MetaFooter publication="Editorial Design System" year="2026" />
    </PageContainer>
  );
}
