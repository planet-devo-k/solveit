import fs from "fs";
import path from "path";

export default async ({ github, context, core }) => {
  const { RULES } = await import("./utils/constants.js");
  const { getMetadata, getListMetadata, getThisWeekChallenges } =
    await import("./utils/parser.js");
  const { getWeekRange } = await import("./utils/date.js");
  const { createIssue, linkSubIssue } = await import("./utils/github.js");

  const { TITLE, BODY, PARENT_NODE_ID } = process.env;
  const templatePath = path.join(
    process.cwd(),
    ".github/ISSUE_TEMPLATE/goal_track_week.md",
  );

  try {
    if (!fs.existsSync(templatePath))
      throw new Error("템플릿 파일이 없습니다.");

    // 1. 자식 탬플릿 메타데이터 추출 (goal track week)
    const templateMetaContent = fs.readFileSync(templatePath, "utf8");

    const title = getMetadata(templateMetaContent, /title:\s*"(.*)"/, "title");
    const assignee = getMetadata(
      templateMetaContent,
      /assignees:\s*"(.*)"/,
      "assignee",
    );
    const labels = getListMetadata(
      templateMetaContent,
      /labels:[\s\S]*?(?=title:|assignees?:|---)/,
      "labels",
    ).split(",");

    const body = templateMetaContent.split("---").slice(2).join("---").trim();

    // 2. 부모 탬플릿 메타데이터 추출(goal track, Epic)
    const sessionStartWeek = parseInt(
      getMetadata(TITLE, /(\d+)/, "session start week"),
    );
    const sessionStartDate = getMetadata(
      BODY,
      /(\d{4}[.-]\d{2}[.-]\d{2})/,
      "start date",
    ).replace(/\./g, "-");

    // 3. 10주치 반복 생성
    for (let i = 0; i < RULES.WEEKS_PER_SESSION; i++) {
      const currentWeek = sessionStartWeek + i;

      const { range, deadline } = getWeekRange(sessionStartDate, i);
      const thisWeekChallenge = getThisWeekChallenges(BODY, i);

      const finalBody = body
        .replace(/2026\. MON ~ 2026\. SUN/g, range)
        .replace(/2026\. SUN/g, deadline)
        .replace(/(- Solve\n?)+/, thisWeekChallenge + "\n");

      const cleanTitle = title.replace(/`/g, "").trim();
      const finalTitle = `\`${cleanTitle}${currentWeek}\``;

      console.log(`goal track week 생성 중: ${finalTitle}`);

      try {
        // 이슈 생성
        const newIssue = await createIssue({
          github,
          context,
          title: finalTitle,
          body: finalBody,
          labels: labels,
          assignees: [assignee],
        });

        // 부모 이슈 연결
        await linkSubIssue({
          github,
          parentNodeId: PARENT_NODE_ID,
          subIssueId: newIssue.node_id,
        });

        console.log(`Week ${currentWeek} 부모 이슈 연결 완료`);
      } catch (error) {
        console.error(
          `에러: Week ${currentWeek} 부모 이슈 연결 실패: ${error.message}`,
        );
      }
    }
  } catch (error) {
    console.error("에러:", error.message);
    core.setFailed(error.message);
  }
};
