/**
 * YYYY.MM.DD 포맷으로 날짜 변환 (한국 시간 보정)
 */
export const formatDateKST = (date) => {
  const kstOffset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + kstOffset);

  return kstDate.toISOString().split("T")[0].replace(/-/g, ".");
};

/**
 * 날짜 문자열의 하이픈을 점으로 치환 (단순 포맷 변경)
 * 예: "2026-03-16" -> "2026.03.16"
 */
export const formatDateString = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.replace(/-/g, ".");
};

/**
 * 현재 시점 기준, 이번 주 월요일 00:00 (KST) 객체를 반환
 */
export const getThisMondayKST = (now) => {
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  const day = kstNow.getUTCDay(); // 일요일(0) ~ 토요일(6)
  const diff = kstNow.getUTCDate() - day + (day === 0 ? -6 : 1);

  const monday = new Date(kstNow.setUTCDate(diff));
  monday.setUTCHours(0, 0, 0, 0); // KST 기준 00:00 (UTC 기준 전날 15:00)

  return new Date(monday.getTime() - 9 * 60 * 60 * 1000);
};

/**
 * 특정 월요일 00:00 (KST) 기준, 해당 주의 마감 시각들을 반환
 * prDeadline: 토요일 24:00 (일요일 00:00 KST)
 * reviewDeadline: 일요일 20:00 (KST)
 */
export function getDeadlinesKST(monday) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerHour = 60 * 60 * 1000;

  const prDeadline = new Date(monday.getTime() + 6 * msPerDay);

  const reviewDeadline = new Date(
    monday.getTime() + 6 * msPerDay + 20 * msPerHour,
  );

  return { prDeadline, reviewDeadline };
}
