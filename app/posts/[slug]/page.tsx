import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMdx } from "@/lib/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { ProgressBar } from "@/components/post/progress-bar";
import { Toc, extractToc } from "@/components/post/toc";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content: mdxContent } = await compileMdx(post.content);

  // Render to string to extract TOC headings
  // We use a simple regex on the raw MDX source
  const tocItems = post.content
    .split("\n")
    .filter((line) => /^#{2,3} /.test(line))
    .map((line) => {
      const level = line.match(/^(#{2,3})/)?.[1].length ?? 2;
      const text = line.replace(/^#{2,3} /, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9가-힣]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      return { id, text, level };
    });

  return (
    <>
      <ProgressBar />
      <div className="post-layout">
        {/* Sidebar TOC (left) */}
        <aside>
          <Toc items={tocItems} />
        </aside>

        {/* Main content */}
        <article className="post-article">
          <header className="post-header">
            <div className="post-meta-top">
              <span
                className="post-category"
                style={{ background: `${post.cover}22`, color: post.cover }}
              >
                {post.category}
              </span>
              <span className="post-date">{post.date}</span>
              <span className="post-readtime">📖 {post.readTime}분</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-tags">
              {post.tags.map((t) => (
                <span key={t} className="pl-tag">#{t}</span>
              ))}
            </div>
          </header>

          <div
            className="post-cover"
            style={{ background: `linear-gradient(135deg, ${post.cover}22, ${post.cover}08)` }}
          />

          <div className="post-prose">{mdxContent}</div>
        </article>

        {/* Right spacer (3-column layout) */}
        <div />
      </div>
    </>
  );
}
