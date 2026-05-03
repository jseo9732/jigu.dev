"use client";

import { useEffect, useRef, useState } from "react";
import { CAREER, getCareerKorean, getCareerDecimal } from "@/lib/career";

const STACK_GROUPS = [
  {
    icon: "Λ",
    title: "Languages",
    sub: "type-safe by default",
    skills: [
      { name: "TypeScript", pct: 90 },
      { name: "JavaScript", pct: 92 },
      { name: "Python", pct: 70 },
    ],
  },
  {
    icon: "▲",
    title: "Frameworks",
    sub: "the tools I reach for",
    skills: [
      { name: "React / Next.js", pct: 90 },
      { name: "React Native", pct: 72 },
      { name: "Tailwind CSS", pct: 85 },
    ],
  },
  {
    icon: "◇",
    title: "State & Data",
    sub: "server state first",
    skills: [
      { name: "TanStack Query", pct: 82 },
      { name: "Zustand", pct: 80 },
      { name: "React Hook Form", pct: 78 },
    ],
  },
  {
    icon: "○",
    title: "Tooling",
    sub: "build, ship, observe",
    skills: [
      { name: "Git / GitHub", pct: 88 },
      { name: "Vercel / AWS", pct: 80 },
      { name: "Claude Code / MCP", pct: 85 },
    ],
  },
];

const VALUES = [
  {
    n: "01",
    title: "추측이 아닌 실측으로 성능을 개선한다",
    desc: "Chrome DevTools, Lighthouse 등 실측 데이터를 근거로 병목을 진단합니다. 느낌이 아니라 수치로 이야기해요.",
  },
  {
    n: "02",
    title: "잘 읽히는 코드는 잘 읽히는 글과 닮았다",
    desc: "함수의 단락이 명확하면 PR 리뷰가 쉬워지고, 변수 이름이 정확하면 디버깅이 빨라져요. 이 둘은 결국 같은 일입니다.",
  },
  {
    n: "03",
    title: "도구를 설계하는 것도 개발이다",
    desc: "AI 코딩 도구 도입, CLAUDE.md 설계, 슬래시 명령어 표준화까지 — 팀이 더 잘 일하도록 환경을 만드는 걸 좋아합니다.",
  },
  {
    n: "04",
    title: "사용자가 1초도 기다리지 않게",
    desc: "성능은 기능입니다. 렌더링 병목, 번들 크기, 서버 상태 캐싱을 늘 신경 씁니다.",
  },
];

const CONTACT = [
  { label: "Email",    value: "jseo9732@gmail.com",        icon: "@",  href: "mailto:jseo9732@gmail.com" },
  { label: "GitHub",   value: "github.com/jseo9732",       icon: "G",  href: "https://github.com/jseo9732" },
  { label: "LinkedIn", value: "linkedin.com/in/jseo9732",  icon: "in", href: "https://www.linkedin.com/in/jseo9732" },
];

const CURRENT = [
  { k: "직무",       v: <span>Frontend Developer @ <span className="ac">밤빗 (Seroc)</span></span> },
  { k: "위치",       v: "서울, 대한민국" },
  { k: "타임존",     v: "KST (UTC+9)" },
  { k: "현재 관심사", v: "성능 최적화, AI 개발 환경, React Native" },
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
            <span className="about-kicker">about · 지구 (jigu)</span>
            <h1 className="about-name">
              안녕하세요,<br />
              <span className="accent">지구</span>입니다.
            </h1>
            <p className="about-tag">
              성능을 실측하고, AI 도구로 개발 환경을 자동화하는 프론트엔드 개발자입니다. 작은 커밋을 매일 쌓는 일에 마음을 둡니다.
            </p>
            <div className="about-quick-meta">
              <span className="pill live"><span className="dot" />open to chat</span>
              <span className="pill">Seoul, KR</span>
              <span className="pill">KST (UTC+9)</span>
              <span className="pill">{getCareerKorean()}</span>
              <span className="pill">@ 밤빗</span>
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
          <span className="n">{getCareerDecimal()}<span className="unit">년</span></span>
          <div className="l">Experience</div>
          <div className="sub">since 2024</div>
        </div>
        <div className="about-number">
          <span className="n">62<span className="unit">x</span></span>
          <div className="l">렌더 속도 단축</div>
          <div className="sub">4,500ms → 72ms</div>
        </div>
        <div className="about-number">
          <span className="n">96<span className="unit">%</span></span>
          <div className="l">업로드 속도 향상</div>
          <div className="sub">S3 Presigned URL</div>
        </div>
        <div className="about-number">
          <span className="n">80<span className="unit">%</span></span>
          <div className="l">중복 코드 감소</div>
          <div className="sub">컴포넌트 추상화</div>
        </div>
      </section>

      {/* bio */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-section-label">소개</div>
          <h2 className="about-section-title">
            추측이 아닌 <span className="accent">실측</span>으로,<br />
            환경을 <span className="accent">설계</span>하는 개발자.
          </h2>
          <div className="bio-grid">
            <div className="bio-prose">
              <p>
                대학교에서 <strong>경영정보학</strong>을 공부하며 IT와 서비스 사이의 경계에 관심을 가졌습니다. 졸업 후 프론트엔드 개발자로 커리어를 시작했어요.
              </p>
              <p>
                지금은 <span className="accent">실측 데이터</span>로 성능 병목을 잡고, <span className="accent">AI 개발 인프라</span>로 팀 전체의 개발 속도를 높이는 일을 합니다. Chrome DevTools로 렌더링 병목을 진단하고, Claude Code로 팀 공용 개발 환경을 자동화했어요.
              </p>
              <p>
                글을 쓰는 이유는 단순합니다. <strong>이해한 만큼만 쓸 수 있고, 쓰지 않으면 잊어버리니까요.</strong>
              </p>
            </div>
            <blockquote className="bio-quote">
              작은 커밋으로 지구를 조금씩 움직이는 사람.
              <span className="bio-quote-author">— 첫 직장 사수가 퇴사할 때 해준 말</span>
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
                <strong>대화는 언제든 환영합니다.</strong> 성능 최적화, 프론트엔드 아키텍처, AI 개발 환경, 글쓰기. 답장은 평일 기준 보통 24시간 안에 드려요.
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
