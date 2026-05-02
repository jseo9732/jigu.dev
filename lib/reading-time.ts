export function calcReadingTime(content: string): number {
  // 한국어 포함 기준: 분당 약 500자
  const chars = content.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(chars / 500));
}
