import fs from "fs";
import path from "path";

export default async ({ github, context, core }) => {
  const SESSION_ID = "6";
  const dataPath = path.join(
    process.cwd(),
    `.github/data/session/session_${SESSION_ID}.json`,
  );
  const templatePath = path.join(
    process.cwd(),
    ".github/ISSUE_TEMPLATE/goal_track.md",
  );

  const session = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  let epicTemplate = fs.readFileSync(templatePath, "utf8");

  // 메타데이터 YAML Frontmatter 제거
  epicTemplate = epicTemplate.replace(/^---[\s\S]*?---/, "").trim();

  // 1. 이번 세션 문제들 생성
  const challengesText = session.challenges
    .map((c) => {
      const dateRange = `**week${c.week}** ${c.start.replace(/-/g, ".")} MON - ${c.end.replace(/-/g, ".")} SUN`;
      const thisWeekChallenges =
        c.list.length > 0
          ? c.list.map((p) => `  * ${p}`).join("\n")
          : "  * 미정";
      return `${dateRange}\n\n${thisWeekChallenges}`;
    })
    .join("\n\n");

  // 2. 템플릿 치환
  const epicBody = epicTemplate
    .replace(/{{duration}}/g, session.duration)
    .replace(/{{start_date}}/g, session.date.start.replace(/-/g, "."))
    .replace(/{{end_date}}/g, session.date.end.replace(/-/g, "."))
    .replace(/{{levels}}/g, session.levels.join(" and "))
    .replace(/{{challenges_text}}/g, challengesText);

  try {
    // 3. 부모 이슈 생성
    const { data: epicIssue } = await github.rest.issues.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      title: session.title,
      body: epicBody,
      assignees: session.assignees,
      labels: session.labels,
    });

    console.log(`goal track 생성 완료: #${epicIssue.number}`);
  } catch (error) {
    core.setFailed(error.message);
  }
};
