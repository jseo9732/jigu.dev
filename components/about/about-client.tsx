"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const CAREER = [
  {
    period: "2024.07 — 현재",
    current: true,
    role: "Frontend Engineer",
    org: "Drift",
    orgType: "B2B SaaS · 시리즈 B",
    desc: "디자인 시스템과 에디터를 만듭니다. RSC 기반 App Router로 마이그레이션을 주도했고, 초기 로드 시간을 38% 줄였습니다. 사내 컴포넌트 라이브러리 v2를 설계해서 6개 프로덕트가 같은 토큰을 공유하도록 만들었어요.",
    tags: ["Next.js", "TypeScript", "Tailwind", "디자인 시스템"],
  },
  {
    period: "2022.03 — 2024.06",
    current: false,
    role: "Frontend Engineer",
    org: "Pebble",
    orgType: "커머스 스타트업",
    desc: "0 → 1 시기에 합류해서 웹 프론트엔드를 처음부터 깔았습니다. SSR 도입, 결제 플로우 리팩토링, 접근성 감사. 3명 팀에서 9명 팀으로 자라는 시기를 함께 했어요.",
    tags: ["React", "Vite", "tRPC", "접근성"],
  },
  {
    period: "2021.04 — 2022.02",
    current: false,
    role: "Software Engineer Intern",
    org: "Naver",
    orgType: "포털 · 웹툰 플랫폼팀",
    desc: "내부 어드민 툴 개발. 첫 프로덕션 코드를 작성한 곳. 코드리뷰 문화를 처음 배웠습니다.",
    tags: ["React", "Recoil"],
  },
];

const STACK_GROUPS = [
  {
    icon: "Λ",
    title: "Languages",
    sub: "type-safe by default",
    skills: [
      { name: "TypeScript", pct: 92 },
      { name: "JavaScript", pct: 95 },
      { name: "Python (basics)", pct: 55 },
    ],
  },
  {
    icon: "▲",
    title: "Frameworks",
    sub: "the tools I reach for",
    skills: [
      { name: "React", pct: 94 },
      { name: "Next.js", pct: 88 },
      { name: "Tailwind CSS", pct: 82 },
    ],
  },
  {
    icon: "◇",
    title: "Tooling",
    sub: "build, test, ship",
    skills: [
      { name: "Vite + pnpm", pct: 85 },
      { name: "Vitest / Playwright", pct: 75 },
      { name: "Git & CI/CD", pct: 88 },
    ],
  },
  {
    icon: "○",
    title: "Adjacent",
    sub: "growing into",
    skills: [
      { name: "Node.js / tRPC", pct: 72 },
      { name: "Postgres", pct: 60 },
      { name: "Figma", pct: 78 },
    ],
  },
];

const VALUES = [
  {
    n: "01",
    title: "잘 읽히는 코드는 잘 읽히는 글과 닮았다",
    desc: "함수의 단락이 명확하면 PR 리뷰가 쉬워지고, 변수 이름이 정확하면 디버깅이 빨라져요. 이 둘은 결국 같은 일입니다.",
  },
  {
    n: "02",
    title: "느슨한 결합, 단단한 경계",
    desc: "모듈 사이를 가능한 한 느슨하게, 그러나 경계는 분명하게 둡니다. 컴포넌트도, 팀도 마찬가지예요.",
  },
  {
    n: "03",
    title: "사용자가 1초도 기다리지 않게",
    desc: "성능은 기능입니다. CLS, LCP, INP를 매주 들여다봅니다.",
  },
  {
    n: "04",
    title: "키보드만 써도 끝까지 가는 UI",
    desc: "접근성은 누군가에겐 필수, 누구에게나 더 좋은 UX. 포커스 링을 끄지 않습니다.",
  },
];

const CONTACT = [
  { label: "Email",    value: "jisu@jigu.dev",        icon: "@",  href: "mailto:jisu@jigu.dev" },
  { label: "GitHub",   value: "github.com/jisu",      icon: "G",  href: "https://github.com/jisu" },
  { label: "LinkedIn", value: "linkedin.com/in/jisu",  icon: "in", href: "https://linkedin.com/in/jisu" },
  { label: "Twitter",  value: "@jigu_dev",             icon: "𝕏",  href: "https://twitter.com/jigu_dev" },
];

const CURRENT = [
  { k: "직무",       v: <span>Frontend Engineer @ <span className="ac">Drift</span></span> },
  { k: "위치",       v: "서울, 대한민국" },
  { k: "타임존",     v: "KST (UTC+9)" },
  { k: "현재 관심사", v: "RSC, Streaming UI, 디자인 토큰 시스템" },
  { k: "읽는 책",    v: "Refactoring (2nd ed.) · Martin Fowler" },
  { k: "상태",       v: <span><span className="ac">●</span> 사이드 프로젝트·대화 환영</span> },
];

export function AboutClient() {
  const [stackVisible, setStackVisible] = useState(false);
  const stackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStackVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    if (stackRef.current) io.observe(stackRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* hero */}
      <section className="about-hero">
        <div className="about-hero-grid" />
        <div className="wrap about-hero-inner">
          <div>
            <span className="about-kicker">about · 지수 (jigu)</span>
            <h1 className="about-name">
              안녕하세요,<br />
              <span className="accent">지구</span>입니다.
            </h1>
            <p className="about-tag">
              4년차 프론트엔드 엔지니어. 잘 읽히는 코드와 잘 읽히는 글을 좋아하고, 작은 커밋을 매일 쌓는 일에 마음을 둡니다.
            </p>
            <div className="about-quick-meta">
              <span className="pill live"><span className="dot" />open to chat</span>
              <span className="pill">Seoul, KR</span>
              <span className="pill">KST (UTC+9)</span>
              <span className="pill">4 years</span>
              <span className="pill">@ Drift</span>
            </div>
          </div>
          <div className="about-avatar">
            <div className="about-avatar-ring" />
            <div className="about-avatar-ring2" />
            <div className="about-avatar-planet" />
            <div className="about-avatar-sat" />
          </div>
        </div>
      </section>

      {/* numbers strip */}
      <section className="about-numbers">
        <div className="about-number">
          <span className="n">4<span className="unit">년차</span></span>
          <div className="l">Experience</div>
          <div className="sub">since 2022</div>
        </div>
        <div className="about-number">
          <span className="n">96<span className="unit">+</span></span>
          <div className="l">Posts</div>
          <div className="sub">all-time</div>
        </div>
        <div className="about-number">
          <span className="n">784</span>
          <div className="l">Contributions</div>
          <div className="sub">last 12 months</div>
        </div>
        <div className="about-number">
          <span className="n">12<span className="unit">k</span></span>
          <div className="l">Reads / month</div>
          <div className="sub">avg. 2026 Q1</div>
        </div>
      </section>

      {/* bio */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-section-label">소개</div>
          <h2 className="about-section-title">
            기술의 <span className="accent">표면</span>이 아니라<br />
            <span className="accent">경계</span>를 다듬는 일을 좋아합니다.
          </h2>
          <div className="bio-grid">
            <div className="bio-prose">
              <p>
                대학에서 <strong>인지과학</strong>을 공부하다가, 사람들이 화면을 어떻게 읽는지가 궁금해서 프론트엔드로 넘어왔습니다. 처음 작성한 프로덕션 코드는 한 줄이 100자가 넘는 jQuery였어요. 그때부터 <span className="accent">잘 읽히는 코드</span>가 무엇인지를 줄곧 생각하고 있습니다.
              </p>
              <p>
                지금은 디자인 시스템과 에디터를 만듭니다. 컴포넌트가 어떻게 조합되는지, 토큰이 어디까지 닿아야 하는지, 그리고 그 경계를 어떻게 글로 설명할지 같은 문제들을 좋아해요.
              </p>
              <p>
                글을 쓰는 이유는 단순합니다. <strong>이해한 만큼만 쓸 수 있고, 쓰지 않으면 잊어버리니까요.</strong>
              </p>
            </div>
            <blockquote className="bio-quote">
              작은 커밋으로 지구를 조금씩 움직이는 사람.
              <span className="bio-quote-author">— 사수가 송별회 때 해준 말</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* career */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-section-label">Career</div>
          <h2 className="about-section-title">지금까지의 <span className="accent">궤도</span>.</h2>
          <div className="timeline">
            {CAREER.map((c, i) => (
              <div key={i} className={"timeline-item" + (c.current ? " current" : "")}>
                <div className="timeline-period">
                  {c.period}
                  {c.current && <span className="now">현재</span>}
                </div>
                <div className="timeline-role">{c.role}</div>
                <div className="timeline-org">
                  <span className="org-name">{c.org}</span> · {c.orgType}
                </div>
                <p className="timeline-desc">{c.desc}</p>
                <div className="timeline-tags">
                  {c.tags.map((t) => (
                    <span key={t} className="t">#{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stack */}
      <section className="about-section" ref={stackRef}>
        <div className="wrap">
          <div className="about-section-label">Stack</div>
          <h2 className="about-section-title">매일 쓰는 <span className="accent">도구</span>들.</h2>
          <div className="stack-grid">
            {STACK_GROUPS.map((g, gi) => (
              <div key={g.title} className="stack-card">
                <div className="stack-card-head">
                  <div className="stack-card-icon">{g.icon}</div>
                  <div>
                    <div className="stack-card-title">{g.title}</div>
                    <div className="stack-card-sub">{g.sub}</div>
                  </div>
                </div>
                <div className="stack-skills">
                  {g.skills.map((s, si) => (
                    <div key={s.name} className="stack-skill">
                      <div className="stack-skill-row">
                        <span className="stack-skill-name">{s.name}</span>
                        <span className="stack-skill-pct">{s.pct}</span>
                      </div>
                      <div className="stack-skill-bar">
                        <div
                          className="stack-skill-fill"
                          style={{
                            width: stackVisible ? s.pct + "%" : "0%",
                            transitionDelay: gi * 0.1 + si * 0.08 + "s",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-section-label">Principles</div>
          <h2 className="about-section-title">일할 때 <span className="accent">붙드는 것</span>들.</h2>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div key={v.n} className="value-card">
                <div className="value-num">— {v.n}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* contact */}
      <section className="about-section" style={{ borderBottom: "none" }}>
        <div className="wrap">
          <div className="about-section-label">Contact</div>
          <h2 className="about-section-title">
            함께 무언가 만들고 싶다면 <span className="accent">언제든.</span>
          </h2>
          <div className="contact-grid">
            <div>
              <p className="contact-lead">
                <strong>대화는 언제든 환영합니다.</strong> 디자인 시스템, 프론트엔드 아키텍처, 글쓰기, 등산. 답장은 평일 기준 보통 24시간 안에 드려요.
              </p>
              <div className="now-card" style={{ marginTop: 24 }}>
                <div className="about-section-label" style={{ margin: 0, marginBottom: 18 }}>Now</div>
                <div className="now-list">
                  {CURRENT.map((r, i) => (
                    <div key={i} className="now-row">
                      <div className="now-key">{r.k}</div>
                      <div className="now-value">{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="contact-channels">
              {CONTACT.map((c) => (
                <a key={c.label} className="contact-channel" href={c.href}>
                  <div className="contact-icon">{c.icon}</div>
                  <div className="contact-info">
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                  <div className="contact-arrow">→</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
