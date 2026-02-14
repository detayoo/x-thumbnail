import {
  CpuIcon,
  TestTubeIcon,
  SchoolIcon as LandmarkIcon,
  BriefcaseIcon,
  PaintBoardIcon,
  Leaf01Icon,
  StethoscopeIcon,
  LegalDocumentIcon,
  SchoolIcon,
  CameraVideoIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Category, KnowledgeSource } from "@/types/content";
import React from "react";

const EngineeringIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={CpuIcon} strokeWidth={2} className={className} />
);

const ScienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={TestTubeIcon} strokeWidth={2} className={className} />
);

const CultureIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={LandmarkIcon} strokeWidth={2} className={className} />
);

const BusinessIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={BriefcaseIcon} strokeWidth={2} className={className} />
);

const DesignIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={PaintBoardIcon} strokeWidth={2} className={className} />
);

const EnvironmentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={Leaf01Icon} strokeWidth={2} className={className} />
);

const HealthIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={StethoscopeIcon} strokeWidth={2} className={className} />
);

const PoliticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon
    icon={LegalDocumentIcon}
    strokeWidth={2}
    className={className}
  />
);

const EducationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={SchoolIcon} strokeWidth={2} className={className} />
);

const ArtsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <HugeiconsIcon icon={CameraVideoIcon} strokeWidth={2} className={className} />
);

export const categories: Category[] = [
  {
    id: "science",
    name: "Science",
    description: "Discovery, research, and understanding our world",
    icon: ScienceIcon,
    color: "text-purple-600",
    url: "https://desci.ng",
    articles: [
      {
        title: "Quantum Breakthroughs",
        description: "The revolution in computing and communication",
        author: "Dr. Amara Okafor",
        date: "January 3, 2026",
        readingTime: "15",
        slug: "quantum-breakthroughs",
        category: "Science",
      },
      {
        title: "Climate Science in 2026",
        description: "Understanding our changing atmosphere",
        author: "Elena Rodriguez",
        date: "December 20, 2025",
        readingTime: "11",
        slug: "climate-science-2026",
        category: "Science",
      },
      {
        title: "Decoding Life",
        description: "Recent advances in genomics and medicine",
        author: "Dr. Wei Zhang",
        date: "November 25, 2025",
        readingTime: "9",
        slug: "genomics-advances",
        category: "Science",
      },
    ],
  },
];

export const knowledgeSources: KnowledgeSource[] = [
  {
    name: "Kiwix",
    description:
      "Offline access to Wikipedia, Stack Exchange, and other open knowledge bases",
    url: "https://www.kiwix.org/",
    type: "endpoint",
    status: "planned",
  },
  {
    name: "Wikipedia API",
    description: "Direct integration with Wikipedia's knowledge graph",
    url: "https://www.mediawiki.org/wiki/API:Main_page",
    type: "api",
    status: "planned",
  },
  {
    name: "Stack Exchange API",
    description: "Technical knowledge and community Q&A",
    url: "https://api.stackexchange.com/",
    type: "api",
    status: "planned",
  },
  {
    name: "OpenAI Knowledge",
    description: "AI-powered content summaries and related insights",
    url: "https://openai.com/",
    type: "api",
    status: "planned",
  },
  {
    name: "Internet Archive",
    description: "Historical content and digital preservation",
    url: "https://archive.org/",
    type: "endpoint",
    status: "planned",
  },
];
