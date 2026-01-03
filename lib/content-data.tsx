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
  // {
  //   id: "engineering",
  //   name: "Engineering",
  //   description: "Innovation, technology, and the future of building",
  //   icon: EngineeringIcon,
  //   color: "text-blue-600",
  //   articles: [
  //     {
  //       title: "The Geometry of Innovation",
  //       description: "How Africa's Designers are Shaping the Future",
  //       author: "Maya Roberts",
  //       date: "July 14, 2021",
  //       readingTime: "8",
  //       slug: "geometry-of-innovation",
  //       image: "/thumbnails/features/geometry.png",
  //       category: "Engineering"
  //     },
  //     {
  //       title: "Preparedness in the Age of AI",
  //       description: "OpenAI's framework for building resilient systems",
  //       author: "Sarah Chen",
  //       date: "December 15, 2025",
  //       readingTime: "12",
  //       slug: "ai-preparedness",
  //       category: "Engineering"
  //     },
  //     {
  //       title: "Building Tomorrow's Infrastructure",
  //       description: "Sustainable engineering for a changing planet",
  //       author: "James Martinez",
  //       date: "November 8, 2025",
  //       readingTime: "10",
  //       slug: "infrastructure-future",
  //       category: "Engineering"
  //     }
  //   ]
  // },
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
  // {
  //   id: "culture",
  //   name: "Culture",
  //   description: "Identity, heritage, and contemporary expression",
  //   icon: CultureIcon,
  //   color: "text-pink-600",
  //   articles: [
  //     {
  //       title: "Digital Cultures",
  //       description: "How technology reshapes cultural identity",
  //       author: "Adewale Johnson",
  //       date: "December 28, 2025",
  //       readingTime: "7",
  //       slug: "digital-cultures",
  //       category: "Culture"
  //     },
  //     {
  //       title: "Heritage & Identity",
  //       description: "Preserving traditions in a modern world",
  //       author: "Fatima Al-Rashid",
  //       date: "December 10, 2025",
  //       readingTime: "10",
  //       slug: "heritage-identity",
  //       category: "Culture"
  //     },
  //     {
  //       title: "Modern Folklore",
  //       description: "Stories that define our generation",
  //       author: "Lucas Silva",
  //       date: "November 15, 2025",
  //       readingTime: "8",
  //       slug: "modern-folklore",
  //       category: "Culture"
  //     }
  //   ]
  // },
  // {
  //   id: "business",
  //   name: "Business",
  //   description: "Commerce, leadership, and economic futures",
  //   icon: BusinessIcon,
  //   color: "text-green-600",
  //   articles: [
  //     {
  //       title: "The Startup Economy",
  //       description: "Building companies in uncertain times",
  //       author: "Raj Patel",
  //       date: "December 30, 2025",
  //       readingTime: "13",
  //       slug: "startup-economy",
  //       category: "Business"
  //     },
  //     {
  //       title: "Leadership in 2026",
  //       description: "New models for organizational success",
  //       author: "Michelle Thompson",
  //       date: "December 18, 2025",
  //       readingTime: "9",
  //       slug: "leadership-2026",
  //       category: "Business"
  //     },
  //     {
  //       title: "Global Markets",
  //       description: "Economic trends shaping our future",
  //       author: "Takeshi Yamamoto",
  //       date: "November 30, 2025",
  //       readingTime: "11",
  //       slug: "global-markets",
  //       category: "Business"
  //     }
  //   ]
  // },
  // {
  //   id: "design",
  //   name: "Design",
  //   description: "Form, function, and the art of creation",
  //   icon: DesignIcon,
  //   color: "text-orange-600",
  //   articles: [
  //     {
  //       title: "Typography Matters",
  //       description: "The power of letterforms in communication",
  //       author: "Sofia Bergström",
  //       date: "December 22, 2025",
  //       readingTime: "6",
  //       slug: "typography-matters",
  //       category: "Design"
  //     },
  //     {
  //       title: "User Experience",
  //       description: "Designing for human needs and desires",
  //       author: "Alex Kim",
  //       date: "December 5, 2025",
  //       readingTime: "10",
  //       slug: "user-experience",
  //       category: "Design"
  //     },
  //     {
  //       title: "Visual Systems",
  //       description: "Creating coherent design languages",
  //       author: "Nina Kowalski",
  //       date: "November 20, 2025",
  //       readingTime: "8",
  //       slug: "visual-systems",
  //       category: "Design"
  //     }
  //   ]
  // },
  // {
  //   id: "environment",
  //   name: "Environment",
  //   description: "Sustainability, conservation, and planetary health",
  //   icon: EnvironmentIcon,
  //   color: "text-emerald-600",
  //   articles: [
  //     {
  //       title: "Renewable Energy Now",
  //       description: "The transition to clean power",
  //       author: "Dr. Maria Santos",
  //       date: "December 27, 2025",
  //       readingTime: "12",
  //       slug: "renewable-energy",
  //       category: "Environment"
  //     },
  //     {
  //       title: "Ocean Conservation",
  //       description: "Protecting marine ecosystems",
  //       author: "David Nguyen",
  //       date: "December 12, 2025",
  //       readingTime: "9",
  //       slug: "ocean-conservation",
  //       category: "Environment"
  //     },
  //     {
  //       title: "Urban Sustainability",
  //       description: "Building greener cities",
  //       author: "Emma Wilson",
  //       date: "November 28, 2025",
  //       readingTime: "7",
  //       slug: "urban-sustainability",
  //       category: "Environment"
  //     }
  //   ]
  // },
  // {
  //   id: "health",
  //   name: "Health",
  //   description: "Wellness, medicine, and human flourishing",
  //   icon: HealthIcon,
  //   color: "text-red-600",
  //   articles: [
  //     {
  //       title: "Mental Wellness",
  //       description: "Understanding and supporting mental health",
  //       author: "Dr. Priya Sharma",
  //       date: "December 29, 2025",
  //       readingTime: "11",
  //       slug: "mental-wellness",
  //       category: "Health"
  //     },
  //     {
  //       title: "Medical Innovation",
  //       description: "Breakthroughs in treatment and care",
  //       author: "Dr. Benjamin Lee",
  //       date: "December 16, 2025",
  //       readingTime: "13",
  //       slug: "medical-innovation",
  //       category: "Health"
  //     },
  //     {
  //       title: "Public Health Today",
  //       description: "Building healthier communities",
  //       author: "Dr. Aisha Mohammed",
  //       date: "November 22, 2025",
  //       readingTime: "8",
  //       slug: "public-health",
  //       category: "Health"
  //     }
  //   ]
  // },
  // {
  //   id: "politics",
  //   name: "Politics",
  //   description: "Governance, democracy, and civic life",
  //   icon: PoliticsIcon,
  //   color: "text-indigo-600",
  //   articles: [
  //     {
  //       title: "Democratic Systems",
  //       description: "Reimagining governance for the 21st century",
  //       author: "Oliver Schmidt",
  //       date: "December 26, 2025",
  //       readingTime: "14",
  //       slug: "democratic-systems",
  //       category: "Politics"
  //     },
  //     {
  //       title: "Global Governance",
  //       description: "International cooperation in practice",
  //       author: "Lena Andersson",
  //       date: "December 8, 2025",
  //       readingTime: "10",
  //       slug: "global-governance",
  //       category: "Politics"
  //     },
  //     {
  //       title: "Policy & Change",
  //       description: "How legislation shapes society",
  //       author: "Marcus Johnson",
  //       date: "November 18, 2025",
  //       readingTime: "9",
  //       slug: "policy-change",
  //       category: "Politics"
  //     }
  //   ]
  // },
  // {
  //   id: "education",
  //   name: "Education",
  //   description: "Learning, knowledge, and human development",
  //   icon: EducationIcon,
  //   color: "text-amber-600",
  //   articles: [
  //     {
  //       title: "Learning Futures",
  //       description: "Reimagining education for tomorrow",
  //       author: "Dr. Sarah Williams",
  //       date: "December 24, 2025",
  //       readingTime: "12",
  //       slug: "learning-futures",
  //       category: "Education"
  //     },
  //     {
  //       title: "Digital Literacy",
  //       description: "Essential skills for the modern world",
  //       author: "Hassan Ali",
  //       date: "December 11, 2025",
  //       readingTime: "8",
  //       slug: "digital-literacy",
  //       category: "Education"
  //     },
  //     {
  //       title: "Educational Equity",
  //       description: "Access to knowledge for all",
  //       author: "Rosa Hernandez",
  //       date: "November 26, 2025",
  //       readingTime: "10",
  //       slug: "educational-equity",
  //       category: "Education"
  //     }
  //   ]
  // },
  // {
  //   id: "arts",
  //   name: "Arts",
  //   description: "Performance, creativity, and aesthetic expression",
  //   icon: ArtsIcon,
  //   color: "text-violet-600",
  //   articles: [
  //     {
  //       title: "Contemporary Art",
  //       description: "Pushing boundaries in visual expression",
  //       author: "Isabella Romano",
  //       date: "December 31, 2025",
  //       readingTime: "9",
  //       slug: "contemporary-art",
  //       category: "Arts"
  //     },
  //     {
  //       title: "Music Evolution",
  //       description: "Sound and culture in transformation",
  //       author: "Andre Baptiste",
  //       date: "December 14, 2025",
  //       readingTime: "7",
  //       slug: "music-evolution",
  //       category: "Arts"
  //     },
  //     {
  //       title: "Performance Today",
  //       description: "Theater and dance in the digital age",
  //       author: "Yuki Tanaka",
  //       date: "November 24, 2025",
  //       readingTime: "11",
  //       slug: "performance-today",
  //       category: "Arts"
  //     }
  //   ]
  // }
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
