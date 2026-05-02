"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const LIST_OPTIONS = [
  { id: "timeline", label: "타임라인" },
  { id: "grid", label: "카드" },
  { id: "minimal", label: "미니멀" },
] as const;

type ListVariant = (typeof LIST_OPTIONS)[number]["id"];

function fmtDate(s: string) {
  const [y, m, d] = s.split("-");
  return `${y}.${m}.${d}`;
}

function fmtShortDate(s: string) {
  const [, m, d] = s.split("-");
  return `${parseInt(m)}월 ${parseInt(d)}일`;
}

interface PostListProps {
  posts: PostMeta[];
  categories: string[];
}

export function PostList({ posts, categories }: PostListProps) {
  const [variant, setVariant] = useState<ListVariant>("timeline");
  const [cat, setCat] = useState("전체");

  const allCategories = ["전체", ...categories];

  const filtered = useMemo(
    () => (cat === "전체" ? posts : posts.filter((p) => p.category === cat)),
    [posts, cat]
  );

  return (
    <section
      id="posts"
      style={{ padding: "56px 0 120px" }}
    >
      <div className="wrap">
        <div className="pl-header">
          <h2 className="pl-heading">글</h2>
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <div className="pl-filters">
              {allCategories.map((c) => (
                <button
                  key={c}
                  className={`filter-chip${c === cat ? " active" : ""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="list-switcher">
              {LIST_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  className={variant === opt.id ? "active" : ""}
                  onClick={() => setVariant(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {variant === "grid" && <GridList posts={filtered} />}
        {variant === "timeline" && <TimelineList posts={filtered} />}
        {variant === "minimal" && <MinimalList posts={filtered} />}
      </div>
    </section>
  );
}

function GridList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="pl-grid">
      {posts.map((p) => (
        <Link
          key={p.slug}
          className="pl-card"
          href={`/posts/${p.slug}`}
          style={{ "--cover-color": p.cover } as React.CSSProperties}
        >
          <div className="pl-card-cover">
            <span className="pl-card-cover-label">
              <span className="dot" />{p.category}
            </span>
            {p.featured && <span className="pl-card-featured">★ pick</span>}
          </div>
          <div className="pl-card-body">
            <h3 className="pl-card-title">{p.title}</h3>
            <p className="pl-card-excerpt">{p.excerpt}</p>
            <div className="pl-card-meta">
              <div className="pl-card-tags">
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t} className="pl-tag">#{t}</span>
                ))}
              </div>
              <span>{fmtDate(p.date)} · {p.readTime}분</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function TimelineList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="pl-tl">
      {posts.map((p) => (
        <Link key={p.slug} className="pl-tl-item" href={`/posts/${p.slug}`}>
          <div className="pl-tl-date">
            <span>{fmtShortDate(p.date)}</span>
            <span className="dot" />
            <span className="cat">{p.category}</span>
            {p.featured && <span className="pl-star">★ 에디터 픽</span>}
          </div>
          <h3 className="pl-tl-title">{p.title}</h3>
          <p className="pl-tl-excerpt">{p.excerpt}</p>
          <div className="pl-tl-foot">
            <span>📖 {p.readTime}분</span>
            <span className="t">
              {p.tags.map((t) => (
                <span key={t} className="pl-tag">#{t}</span>
              ))}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function MinimalList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="pl-min">
      {posts.map((p) => (
        <Link key={p.slug} className="pl-min-row" href={`/posts/${p.slug}`}>
          <div className="pl-min-date">{fmtDate(p.date)}</div>
          <div className="pl-min-content">
            <h3 className="pl-min-title">
              {p.title}
              {p.featured && <span className="pl-star">★</span>}
            </h3>
            <p className="pl-min-excerpt">{p.excerpt}</p>
          </div>
          <div className="pl-min-meta">
            <span className="cat">{p.category}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
