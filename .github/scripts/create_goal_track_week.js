import { execSync } from "node:child_process";
import fs from "node:fs";
import process from "node:process";

try {
  const PROJECT_NUMBER = "1";

  const { TITLE, BODY, PARENT_NODE_ID, OWNER } = process.env;
  const templatePath = ".github/ISSUE_TEMPLATE/goal_track_week.md";

  if (!fs.existsSync(templatePath)) {
    console.error("에러: 템플릿 파일이 없습니다.");
    process.exit(1);
  }

  // 1. 자식 탬플릿 메타데이터 가져오기 (goal track week)
  const templateMetaContent = fs.readFileSync(templatePath, "utf8");

  /**
   * 메타데이터를 가져오는 통합 헬퍼 함수
   * @param {string} text - 검사할 전체 텍스트 (파일내용, TITLE, BODY 등)
   * @param {RegExp} pattern - 찾을 정규표현식 패턴
   * @param {string} fieldName - 에러 메시지에 표시할 필드명
   * @param {boolean} isList - 리스트(- 항목)인지 여부
   */
  const getMetadata = (text, pattern, fieldName, isList = false) => {
    const getContent = text.match(pattern);

    if (!getContent || !getContent[0])
      throw new Error(`에러: 템플릿에 '${fieldName}' 구역이 없습니다.`);

    if (isList) {
      const listItems = getContent[0].match(/-\s*(.*)/g);
      if (!listItems)
        throw new Error(`에러: '${fieldName}'에 등록된 항목이 없습니다.`);
      return listItems.map((item) => item.replace(/-\s*/, "").trim()).join(",");
    }

    const value = getContent[1] || (getContent[0].match(/"(.*?)"/) || [])[1];
    if (!value)
      throw new Error(`에러: '${fieldName}'의 값을 찾을 수 없습니다.`);
    return value;
  };

  const title = getMetadata(templateMetaContent, /title:\s*"(.*)"/, "title");
  const assignee = getMetadata(
    templateMetaContent,
    /assignees:\s*"(.*)"/,
    "assignee",
  );
  const labels = getMetadata(
    templateMetaContent,
    /labels:[\s\S]*?(?=title:|assignees?:|---)/,
    "labels",
    true,
  );

  const body = templateMetaContent.split("---").slice(2).join("---").trim();

  // 2. 부모 탬플릿 메타 데이터 가져오기(goal track, Epic)
  const sessionStartWeek = parseInt(
    getMetadata(TITLE, /(\d+)/, "session start week"),
  );
  const sessionStartDate = getMetadata(
    BODY,
    /(\d{4}[.-]\d{2}[.-]\d{2})/,
    "start date",
  ).replace(/\./g, "-");

  // 3. 10주치 반복 생성
  for (let i = 0; i < 10; i++) {
    const currentWeek = sessionStartWeek + i;

    // 3.1 월요일 계산
    const thisWeekStart = new Date(sessionStartDate);
    thisWeekStart.setDate(thisWeekStart.getDate() + i * 7);

    // 3.2 일요일 계산
    const thisWeekEnd = new Date(thisWeekStart);
    thisWeekEnd.setDate(thisWeekEnd.getDate() + 6);

    const formatDate = (date) =>
      date.toISOString().split("T")[0].replace(/-/g, ".");

    const weekRange = `${formatDate(thisWeekStart)} MON ~ ${formatDate(thisWeekEnd)} SUN`;
    const deadline = `${formatDate(thisWeekEnd)} SUN`;

    // 3.3 이번주 문제 리스트
    const findThisWeekChallenges = new RegExp(
      `week${i}[\\s\\S]*?(?=week${i + 1}|$)`,
      "i",
    );

    const thisWeekChallenges = BODY.match(findThisWeekChallenges)?.[0];

    let thisWeekChallenge = "  - [ ] 문제를 찾지 못했습니다.";

    if (thisWeekChallenges) {
      const challengeLists = thisWeekChallenges.match(/^-\s*.+/gm);
      if (challengeLists) {
        thisWeekChallenge = challengeLists
          .map((line) => line.replace(/^-\s*/, "  - [ ] Solve "))
          .join("\n");
      }
    }

    // 3.4 최종 본문에 치환
    const finalBody = body
      .replace(/2026\. MON ~ 2026\. SUN/g, weekRange)
      .replace(/2026\. SUN/g, deadline)
      .replace(/(- Solve\n?)+/, thisWeekChallenge + "\n");

    const cleanTitle = title.replace(/`/g, "").trim();
    const finalTitle = `\`${cleanTitle}${currentWeek}\``;

    const bodyFile = `temp_body_${currentWeek}.md`;

    fs.writeFileSync(bodyFile, finalBody);

    // 3.5 GitHub CLI 실행
    console.log(`goal track week 생성 중: ${finalTitle}`);

    const childUrl = execSync(
      `gh issue create --title '${finalTitle}' --body-file "${bodyFile}" --label "${labels}" --assignee "${assignee}"`,
      { encoding: "utf8" },
    ).trim();

    // 생성된 이슈가 서버에 반영될 때까지 1초 대기
    execSync("sleep 1");

    // 3.6 부모 이슈 연결
    try {
      if (PARENT_NODE_ID) {
        const childId = execSync(
          `gh issue view "${childUrl}" --json id -q ".id"`,
          { encoding: "utf8" },
        ).trim();

        const query = `mutation($parentId: ID!, $subIssueId: ID!) { addSubIssue(input: {issueId: $parentId, subIssueId: $subIssueId}) { issue { id } } }`;

        execSync(
          `gh api graphql -f query='${query}' -f parentId="${PARENT_NODE_ID}" -f subIssueId="${childId}"`,
        );

        console.log(`Week ${currentWeek} 부모 이슈 연결 완료`);
      }
    } catch (error) {
      console.error(
        `에러: Week ${currentWeek} 부모 이슈 연결 실패: ${error.message}`,
      );
    }
  }
} catch (error) {
  console.error("에러:", error.message);
  process.exit(1);
}
