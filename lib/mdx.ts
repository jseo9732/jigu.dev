import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import type { BundledTheme } from "shiki";
import type { MDXComponents } from "mdx/types";

const DARK_THEME: BundledTheme = "github-dark-dimmed";
const LIGHT_THEME: BundledTheme = "github-light";

export async function compileMdx(source: string, components?: MDXComponents) {
  return compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: { className: ["anchor"] },
            },
          ],
          [
            rehypePrettyCode,
            {
              themes: { dark: DARK_THEME, light: LIGHT_THEME },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });
}
