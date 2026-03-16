/**
 * 이슈 템플릿의 YAML Frontmatter(--- ... ---) 구역을 제거합니다.
 */
export const removeYamlFrontmatter = (text) => {
  return text.replace(/^---[\s\S]*?---/, "").trim();
};

/**
 * 템플릿 내의 {{key}} 형태의 플레이스홀더를 실제 데이터로 치환합니다.
 */
export const replacePlaceholders = (template, data) => {
  let result = template;
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    result = result.replace(regex, value);
  });
  return result;
};
