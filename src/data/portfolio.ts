export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  demoLink?: string;
  repoLink?: string;
  image?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  year: string;
  field: string;
}

export const portfolioData = {
  personal: {
    name: "Dimas Firmansyah",
    role: "Web Developer",
    tagline: "Crafting playful, performant web products with a retro soul.",
    bio: "Frontend-focused developer who builds accessible, fast, and delightful web experiences. I enjoy shipping design systems, motion-rich interfaces, and clean, maintainable code.",
    coreStack: ["Next.js","NestJS","GO","PHP","MongoDB", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },

  skills: [
    {
      category: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Storybook",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST API", "NestJS", "GO", "PHP",'MongoDB'],
    },
    {
      category: "Tools",
      skills: ["Git", "Docker", "Vercel", "Figma", "Playwright"],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: 1,
      title: "LERERO",
      description:
        "Lerero is a web application designed to enhance learning efficiency, effectiveness, and engagement. It integrates 10 modules into a cohesive framework and supports advanced analytics, providing valuable insights for better learning outcomes.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      demoLink: "https://lerero.com",
    },
    {
      id: 2,
      title: "AMSI RECRUITMENT MANAGEMENT SYSTEM",
      description:
        "AMSI is a website application designed to manage resources for companies. It can manage employees, headcounts, tools, etc. It also supports separation analytics, sandbox analytics, and more",
      techStack: ["React", "Node.js", "PostgreSQL", "Prisma"],
      // demoLink: "https://demo.example.com/quest-tracker",
      // repoLink: "https://github.com/rakaw/quest-tracker",
    },
    {
      id: 3,
      title: "KARLO",
      description:
        "Karlo is one of the biggest logistics platforms in Indonesia, and I created APIs for Karlo's web apps and Android apps using Node.js & MongoDB.",
      techStack: ["Next.js", "MDX", "Supabase", "Tailwind CSS"],
      demoLink: "https://karlo.id",
      // repoLink: "https://github.com/rakaw/studio-notes",
    },
    {
      id: 4,
      title: "Launchboard",
      description:
        "Team project board with drag-and-drop lanes and a realtime activity feed.",
      techStack: ["React", "Dnd Kit", "Firebase", "Tailwind CSS"],
      demoLink: "https://demo.example.com/launchboard",
      repoLink: "https://github.com/rakaw/launchboard",
    },
  ] as Project[],

  experience: [
    {
      id: 1,
      title: "Backend Developer",
      company: "PT Kreasi Digital Indo Utama",
      period: "Okt 2020 - Mar 2021",
      description: ""
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Star Karlo Indonesia",
      period: "Jan 2021 - Present",
      description:
        "Analyze data and processes for improvement, collaborate across teams to enhance UX, develop new features based on industry trends, report to stakeholders, keep learning, and lead projects when needed.",
    },
    {
      id: 3,
      title: "Backend Developer Freelance",
      company: "PT Abhinaya Teknologi Indonesia",
      period: "Okt 2020 - Present",
      description:
        "Delivered reusable UI components and collaborated closely with product and brand teams.",
    },
    {
      id:4,
      title: "Fullstack Developer",
      company: "The KPI Institute",
      period: "Jan 2022 - Present",
      description:
        "Collaborate across teams to build software, implement designs into quality code, integrate systems, align with visual intent, test/debug, maintain and improve websites, and deliver upgrades for security and performance.",
    },
  ] as ExperienceItem[],

  education: [
    {
      id: 1,
      degree: "Bachelors Informatics Engineering",
      institution: "Universitas Komputer Indonesia",
      year: "2020",
      field: "Computer Science",
    },
    {
      id: 2,
      degree: "Master Computer Science",
      institution: "Gadjah Mada University",
      year: "2026",
      field: "Computer Science",
    },
  ] as EducationItem[],

  contact: {
    email: "dimasfrmnsyh@gmail.com",
    github: "https://github.com/dimasfrmnsyah",
    linkedin: "https://www.linkedin.com/in/dimas-firmansyah-73787b124/",
  },
};
