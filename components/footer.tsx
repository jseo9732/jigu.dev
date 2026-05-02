import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        padding: "40px 0 80px",
        marginTop: "auto",
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--fg-dimmer)",
          }}
        >
          <span>© {year} {siteConfig.handle}.dev</span>
          <span>
            <a
              href={`https://github.com/${siteConfig.github}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--fg-dim)" }}
            >
              github
            </a>
            {" · "}
            <a
              href={`mailto:${siteConfig.email}`}
              style={{ color: "var(--fg-dim)" }}
            >
              email
            </a>
            {" · "}
            <a href="/feed.xml" style={{ color: "var(--fg-dim)" }}>
              rss
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
