"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writings", label: "Writings" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight hover:opacity-70"
        >
          {site.shortName}
        </Link>
        <nav className="flex items-center gap-1 sm:gap-4" aria-label="Main">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 py-1 text-sm transition-opacity ${
                  active
                    ? "underline underline-offset-4 decoration-foreground"
                    : "opacity-55 hover:opacity-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
