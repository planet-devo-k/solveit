/**
 * 일반적인 메타데이터 추출 (단일 값)
 */
export const getMetadata = (text, pattern, fieldName) => {
  const match = text.match(pattern);
  if (!match || !match[0]) {
    throw new Error(`에러: '${fieldName}' 구역을 찾을 수 없습니다.`);
  }

  const value = match[1] || (match[0].match(/"(.*?)"/) || [])[1];
  if (!value) throw new Error(`에러: '${fieldName}'의 값을 찾을 수 없습니다.`);

  return value.trim();
};

/**
 * 리스트 형태(- 항목)의 메타데이터 추출
 */
export const getListMetadata = (text, pattern, fieldName) => {
  const match = text.match(pattern);
  if (!match || !match[0]) {
    throw new Error(`에러: '${fieldName}' 구역이 없습니다.`);
  }

  const listItems = match[0].match(/-\s*(.*)/g);
  if (!listItems)
    throw new Error(`에러: '${fieldName}'에 등록된 항목이 없습니다.`);

  return listItems.map((item) => item.replace(/-\s*/, "").trim()).join(",");
};

/**
 * 특정 주차의 챌린지 리스트 추출 및 변환
 */
export const getThisWeekChallenges = (body, weekIndex) => {
  const findPattern = new RegExp(
    `week${weekIndex}[\\s\\S]*?(?=week${weekIndex + 1}|$)`,
    "i",
  );

  const section = body.match(findPattern)?.[0];

  if (!section) return "  - [ ] 문제를 찾지 못했습니다.";

  const challengeLists = section.match(/^-\s*.+/gm);

  if (!challengeLists) return "  - [ ] 문제를 찾지 못했습니다.";

  return challengeLists
    .map((line) => line.replace(/^-\s*/, "  - [ ] Solve "))
    .join("\n");
};
