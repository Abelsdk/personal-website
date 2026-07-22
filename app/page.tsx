import Link from "next/link";
import { NowPlaying } from "@/components/now-playing";
import {
  about,
  experience,
  projects,
  site,
  study,
} from "@/content/site";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <p className="font-mono text-xs tracking-widest uppercase opacity-50">
          {site.location}
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {site.name}
        </h1>
        <p className="text-base leading-relaxed opacity-70">{site.title}</p>
        <p className="max-w-prose text-[15px] leading-relaxed">{about.intro}</p>
        <p className="max-w-prose text-[15px] leading-relaxed opacity-80">
          {about.ambition}
        </p>
        <NowPlaying />
      </section>

      <section className="space-y-6">
        <h2 className="text-sm font-medium tracking-widest uppercase opacity-50">
          Experience
        </h2>
        <ul className="space-y-10">
          {experience.map((job) => (
            <li key={`${job.org}-${job.role}`} className="space-y-2">
              <div className="space-y-1">
                <h3 className="text-base font-medium tracking-tight">
                  {job.role}
                </h3>
                <p className="text-sm opacity-70">
                  {job.org} · {job.location}
                </p>
                <p className="font-mono text-xs opacity-45">{job.dates}</p>
              </div>
              <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed opacity-85">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium tracking-widest uppercase opacity-50">
          Study
        </h2>
        <div className="space-y-2">
          <h3 className="text-base font-medium tracking-tight">
            {study.degree}
          </h3>
          <p className="text-sm opacity-70">
            {study.school} · {study.years}
          </p>
          <p className="text-[15px] leading-relaxed opacity-85">
            Coursework: {study.coursework.join(", ")}
          </p>
          <p className="text-[15px] leading-relaxed opacity-85">
            Certification: {study.certification}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium tracking-widest uppercase opacity-50">
            Selected projects
          </h2>
          <Link
            href="/projects"
            className="text-sm opacity-55 underline-offset-4 hover:opacity-100 hover:underline"
          >
            All projects
          </Link>
        </div>
        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects#${project.slug}`}
                className="flex flex-col gap-1 py-4 transition-opacity hover:opacity-70 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-medium tracking-tight">
                  {project.title}
                </span>
                <span className="font-mono text-xs opacity-45">
                  {project.dates}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
