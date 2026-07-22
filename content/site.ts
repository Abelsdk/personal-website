export const site = {
  name: "Abdul Rahman El Saddik",
  shortName: "Abdul El Saddik",
  title: "Software Engineering student (Co-op) · University of Ottawa",
  location: "Ottawa, ON",
  email: "abelsaddik@gmail.com",
  socials: {
    github: "https://github.com/Abelsdk",
    linkedin: "https://www.linkedin.com/in/abdul-elsaddik",
    x: "https://x.com/swe_abdul",
    youtube: "https://www.youtube.com/@AbdulElSaddik",
  },
} as const;

export const about = {
  intro:
    //"I'm building AI-powered products and taking on freelance AI-automation work while studying Software Engineering at uOttawa. Currently researching AI-driven interactive lecture systems at the MCR Lab, building ACL Buddy (a recovery app for ACL surgery patients), and leading a Shopify e-commerce build for Bacata Coffee.",
  ambition:
    "I want to work at the frontier of AI engineering, which means shipping systems that are genuinely useful, not demos, and I'm building the public track record to prove it.",
};

export const experience = [
  {
    role: "AI Integration Researcher",
    org: "MCR Lab, University of Ottawa",
    location: "Ottawa, ON",
    dates: "June 2026 – Present",
    bullets: [
      "Contributing to applied research on AI-powered interactive lecture systems using digital twin technology",
      "Researching LLM integration patterns and proposing implementation approaches in weekly sessions with graduate researchers",
      "Supporting experimentation pipelines, data prep, and evaluation under faculty mentorship",
    ],
  },
  {
    role: "Software Engineering Consultant",
    org: "Bacata Coffee",
    location: "Remote",
    dates: "July 2026 – August 2026",
    bullets: [
      "Leading end-to-end Shopify e-commerce implementation integrated with an existing Webflow site",
      "Configuring payment processing, shipping, and inventory as sole technical stakeholder",
      "Translating business requirements directly into technical delivery, independently",
    ],
  },
  {
    role: "Sales Development Representative",
    org: "StudentWorks Painting & Simply Student Services",
    location: "Ottawa, ON",
    dates: "Spring 2026 – Present",
    bullets: [
      "Managing inbound/outbound lead pipelines across two service lines, deals worth upto $5,000",
      "30% lead-to-appointment conversion via structured qualification frameworks",
      "Influenced ~$10k in booked revenue; built CRM hygiene and follow-up workflows",
    ],
  },
] as const;

export const study = {
  degree: "B.A.Sc. Software Engineering (Co-op)",
  school: "University of Ottawa",
  years: "2025–2029",
  coursework: [
    "Object-Oriented Programming",
    "Web Development",
    "Software Design",
    "Project Management",
    "Software Product",
  ],
  certification: "AI Automation with Python — Google via Coursera (2025)",
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  dates: string;
  github?: string;
  demo?: string;
  stack: string[];
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "acl-buddy",
    title: "ACL Buddy",
    summary:
      "A PWA for ACL surgery patients: research-based recovery protocols, rehab timelines, and exercise libraries, grounded in verified clinical literature.",
    dates: "2026 – ongoing",
    github: "https://github.com/Abelsdk/ACL-Buddy",
    stack: [
      "Next.js",
      "React",
      "Supabase",
      "Gemini API",
      "Ollama",
      "Tailwind CSS",
      "Vercel",
    ],
    body: [
      "Built from personal surgical experience to fill a gap in accessible, clinically grounded recovery tools - not another chatbot that guesses.",
      "Phase 1 (complete): full RAG pipeline using Gemini API + Ollama, with vector search over verified clinical literature for contextually grounded answers to patient recovery questions. Includes table-aware PDF extraction, vision-model captions for embedded figures, structure-aware chunking, hybrid retrieval, and a calibrated no-match threshold so the system refuses to answer when evidence is weak.",
      "Phase 2 (in progress): cross-platform front-end (iOS/Android/web) as a PWA, avoiding native app store dependency.",
    ],
  },
  {
    slug: "craft-agents",
    title: "CRAFT Agents",
    summary:
      "An ai presentation-building tool with a multi-agent pipeline (Context → Roadmap → Assemble → Fine-Tune → Tell), RAG-backed document/image ingestion, and a React/FastAPI interface.",
    dates: "2025 – 2026",
    github: "https://github.com/Abelsdk/craft-agents",
    stack: [
      "React",
      "Vite",
      "FastAPI",
      "Ollama",
      "Llama 3.1",
      "ChromaDB",
      "sentence-transformers",
      "LLaVA",
    ],
    body: [
      "A multi-agent AI system that guides users through structuring a presentation via a 5-stage pipeline, using an orchestrator/worker-agent architecture with retry-and-escalation error handling and append-only state management.",
      "Designed a RAG pipeline (ChromaDB, sentence-transformers) that ingests PDFs, Word docs, and images — combining table-aware text extraction, OCR, and a vision model (LLaVA) to ground presentation content in uploaded source material.",
      "Built a full-stack web interface (React/Vite frontend, FastAPI backend) with inline content editing, on-demand AI coherence checks, and a live session-state panel, running entirely on local LLMs (Ollama/Llama 3.1) for privacy.",
      "Shipped with 160+ automated tests and a practice of live end-to-end verification, catching and fixing real bugs (e.g. a retry-counter reset issue, a state-clearing UI bug) beyond what unit tests alone surfaced.",
    ],
  },
  {
    slug: "bacata-coffee",
    title: "Bacata Coffee — Shopify + Webflow",
    summary:
      "End-to-end Shopify storefront integrated with an existing Webflow site for Bacata Coffee.",
    dates: "Summer 2026 – Present",
    stack: ["Shopify", "Webflow"],
    body: [
      "Problem: Bacata Coffee needed a production e-commerce storefront that fit an existing Webflow marketing site — payments, shipping, and inventory — without a large engineering team.",
      "Solution: Led the full Shopify implementation as sole technical stakeholder, integrating with the live Webflow presence and configuring payment processing, shipping, and inventory end to end.",
      "Outcome: Independent technical delivery from requirements through store setup; translating business needs into a shippable commerce stack.",
    ],
  },
];

export type Writing = {
  title: string;
  url: string;
  date?: string;
  blurb: string;
};

export const writings: Writing[] = [
  {
    title:
      "Building ACL Buddy, v1: Why I Built a RAG Pipeline Instead of Another Chatbot",
    url: "https://www.linkedin.com/pulse/building-acl-buddy-v1-why-i-built-rag-pipeline-abdul-rahman-el-saddik-zh0jc/",
    date: "2026",
    blurb:
      "Why trustworthy recovery answers need retrieval over curated clinical sources — and what it took to build that pipeline for ACL Buddy.",
  },
];
