import type { Metadata } from "next";
import { writings } from "@/content/site";

export const metadata: Metadata = {
  title: "Writings",
  description: "Articles and notes by Abdul Rahman El Saddik.",
};

export default function WritingsPage() {
  return (
    <div className="space-y-14">
      <header className="space-y-3">
        <h1 className="text-3xl font-medium tracking-tight">Writings</h1>
        <p className="max-w-prose text-[15px] leading-relaxed opacity-70">
          Longer notes on what I&apos;m building and learning.
        </p>
      </header>

      {writings.length === 0 ? (
        <p className="text-[15px] opacity-60">Coming soon.</p>
      ) : (
        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {writings.map((piece) => (
            <li key={piece.url} className="py-6">
              <a
                href={piece.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block space-y-2"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h2 className="text-lg font-medium tracking-tight underline-offset-4 group-hover:underline">
                    {piece.title}
                  </h2>
                  {piece.date ? (
                    <span className="shrink-0 font-mono text-xs opacity-45">
                      {piece.date}
                    </span>
                  ) : null}
                </div>
                <p className="max-w-prose text-[15px] leading-relaxed opacity-70">
                  {piece.blurb}
                </p>
                <span className="inline-block text-sm opacity-55 group-hover:opacity-100">
                  Read on LinkedIn →
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
