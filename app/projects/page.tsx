import type { Metadata } from "next";
import { projects, type ProjectCaseStudy } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "ACL Buddy, CRAFT Agents, and freelance work — thorough write-ups and source links.",
};

const caseStudyColumns: {
  key: keyof ProjectCaseStudy;
  label: string;
}[] = [
  { key: "problem", label: "Problem" },
  { key: "solution", label: "Solution" },
  { key: "outcome", label: "Outcome" },
];

function CaseStudyTable({ caseStudy }: { caseStudy: ProjectCaseStudy }) {
  return (
    <div
      className="grid border-y border-foreground/15 sm:grid-cols-3"
      role="table"
      aria-label="Case study"
    >
      {caseStudyColumns.map((col, index) => (
        <div
          key={col.key}
          role="row"
          className={`space-y-2 py-4 sm:px-5 sm:py-5 ${
            index === 0 ? "sm:pl-0" : ""
          } ${index === caseStudyColumns.length - 1 ? "sm:pr-0" : "sm:border-r sm:border-foreground/10"} ${
            index < caseStudyColumns.length - 1
              ? "border-b border-foreground/10 sm:border-b-0"
              : ""
          }`}
        >
          <div
            role="columnheader"
            className="text-sm font-medium tracking-tight"
          >
            {col.label}
          </div>
          <p
            role="cell"
            className="text-[15px] leading-relaxed opacity-90"
          >
            {caseStudy[col.key]}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="space-y-14">
      <header className="space-y-3">
        <h1 className="text-3xl font-medium tracking-tight">Projects</h1>
        <p className="max-w-prose text-[15px] leading-relaxed opacity-70">
          What I&apos;ve been building — problem, approach, and where the code
          lives.
        </p>
      </header>

      <div className="space-y-16">
        {projects.map((project) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-mt-24 space-y-5 border-t border-foreground/10 pt-10 first:border-t-0 first:pt-0"
          >
            <div className="space-y-2">
              <p className="font-mono text-xs opacity-45">{project.dates}</p>
              <h2 className="text-2xl font-medium tracking-tight">
                {project.title}
              </h2>
              <p className="text-[15px] leading-relaxed opacity-80">
                {project.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[11px] tracking-wide border border-foreground/15 px-2 py-0.5 opacity-70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 opacity-80 hover:opacity-100"
                >
                  GitHub
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 opacity-80 hover:opacity-100"
                >
                  Live demo
                </a>
              ) : null}
            </div>

            {project.caseStudy ? (
              <CaseStudyTable caseStudy={project.caseStudy} />
            ) : project.body ? (
              <div className="space-y-3 text-[15px] leading-relaxed opacity-90">
                {project.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
