"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/site-config";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          <span className="brand-glyph" />
          <span>
            {siteConfig.handle}
            <small>.dev</small>
          </span>
        </Link>

        <div className="nav-links">
          {siteConfig.nav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link ${pathname.startsWith(href) ? "active" : ""}`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
