export const CAREER = [
  {
    start: "2025-05",
    end: null as string | null,
    period: "2025.05 — 현재",
    current: true,
    role: "Frontend Developer",
    org: "밤빗 (BAMBIT)",
    orgType: "AI 서비스 스타트업 · Seroc(새록)",
    desc: "프론트엔드 단독으로 성능 최적화, React Native 앱 개발, 인앱결제 구축, AI 개발 인프라 설계까지 서비스 전 과정을 주도합니다. tanstack/react-virtual로 목록 863개를 가상화해 초기 렌더 시간을 4,500ms → 72ms(62배)로 단축했고, Claude Code 기반 팀 공용 AI 개발 인프라(CLAUDE.md, 슬래시 명령어, MCP)를 설계했습니다.",
    tags: ["Next.js", "React Native", "TypeScript", "TanStack Virtual", "Claude Code"],
  },
  {
    start: "2025-03",
    end: "2025-05",
    period: "2025.03 — 2025.05",
    current: false,
    role: "Frontend Developer (프리랜서)",
    org: "밤빗 (BAMBIT)",
    orgType: "AI 서비스 스타트업 · Seroc(새록)",
    desc: "신규 서비스 프론트엔드 단독 담당으로 아키텍처 설계부터 MVP 출시까지 전 과정 주도. Kakao OAuth 소셜 로그인, SSE 스트리밍 AI 응답 실시간 렌더링, GitHub-Vercel CI/CD 파이프라인 구축 등 핵심 기능 개발 후 정규직 전환.",
    tags: ["Next.js", "TypeScript", "Zustand", "Vercel"],
  },
  {
    start: "2024-06",
    end: "2024-10",
    period: "2024.06 — 2024.10",
    current: false,
    role: "Frontend Developer (인턴 → 프리랜서)",
    org: "LSMK",
    orgType: "기계설비 점검 서비스 · BlueMentor",
    desc: "기계설비 성능점검 보고서 자동 생성 서비스 프론트엔드 단독 담당. ExcelJS로 Excel 보고서 자동 생성, S3 Presigned URL 직접 업로드로 이미지 업로드 속도 96% 향상, UI 컴포넌트 추상화로 중복 코드 80% 감소.",
    tags: ["React", "TypeScript", "ExcelJS", "React Query"],
  },
];

function getTotalCareerMonths(): number {
  const now = new Date();
  return CAREER.reduce((total, { start, end }) => {
    const [sy, sm] = start.split("-").map(Number);
    const s = new Date(sy, sm - 1, 1);
    const e = end
      ? (() => { const [ey, em] = end.split("-").map(Number); return new Date(ey, em - 1, 1); })()
      : now;
    return total + (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  }, 0);
}

/** 년차 표기용 (내림) — 예: 18개월 → 1 */
export function getCareerYears(): number {
  return Math.floor(getTotalCareerMonths() / 12);
}

/** 소수점 표기용 — 예: 18개월 → 1.5 */
export function getCareerDecimal(): number {
  return Math.round((getTotalCareerMonths() / 12) * 10) / 10;
}

/** 한국어 표기용 — 예: 18개월 → "1년 6개월" */
export function getCareerKorean(): string {
  const total = getTotalCareerMonths();
  const y = Math.floor(total / 12);
  const m = total % 12;
  if (m === 0) return `${y}년`;
  if (y === 0) return `${m}개월`;
  return `${y}년 ${m}개월`;
}
