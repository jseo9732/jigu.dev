"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  items: TocItem[];
}

export function Toc({ items }: TocProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-64px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="post-toc">
      <div className="post-toc-label">목차</div>
      <ul className="post-toc-list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`post-toc-item${item.level === 3 ? " h3" : ""}${active === item.id ? " active" : ""}`}
          >
            <a
              href={`#${item.id}`}
              className="post-toc-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function extractToc(html: string): TocItem[] {
  const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    items.push({ level: parseInt(match[1]), id: match[2], text });
  }
  return items;
}
