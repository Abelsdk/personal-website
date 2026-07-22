import { site } from "@/content/site";

const socialLinks = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "X", href: site.socials.x },
  { label: "YouTube", href: site.socials.youtube },
  { label: "Email", href: `mailto:${site.email}` },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-foreground/10">
      <div className="mx-auto flex max-w-2xl flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm opacity-55">{site.name}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="opacity-55 underline-offset-4 hover:opacity-100 hover:underline"
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
