import fs from "fs";
import path from "path";
import { MEMBERS } from "./utils/constants.js";

export default async ({ github, context, core }) => {
  const OWNER_ID = "sgoldenbird";
  const SESSION_ID = "6";

  const dataPath = path.join(
    process.cwd(),
    `.github/data/session/session_${SESSION_ID}.json`,
  );
  const sessionTemplatePath = path.join(
    process.cwd(),
    ".github/ISSUE_TEMPLATE/goal_track_session.md",
  );
  const weekTemplatePath = path.join(
    process.cwd(),
    ".github/ISSUE_TEMPLATE/goal_track_week.md",
  );

  const session = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  let sessionTemplate = fs.readFileSync(sessionTemplatePath, "utf8");
  let weekTemplate = fs.readFileSync(weekTemplatePath, "utf8");

  const sessionStartWeek = Math.min(...session.weeks);
  const sessionEndWeek = Math.max(...session.weeks);
  const levelLabels = session.levels.map((lvl) => `level${lvl}`);

  // 메타데이터 YAML Frontmatter 제거 함수
  const removeYaml = (text) => text.replace(/^---[\s\S]*?---/, "").trim();

  // 1. 세션 문제들 생성
  const sessionChallengesText = session.challenges
    .map((c) => {
      const dateRange = `**week${c.week}** ${c.start.replace(/-/g, ".")} MON - ${c.end.replace(/-/g, ".")} SUN`;
      const thisWeekChallenges =
        c.list.length > 0
          ? c.list.map((p) => `  * ${p}`).join("\n")
          : "  * 미정";
      return `${dateRange}\n\n${thisWeekChallenges}`;
    })
    .join("\n\n");

  // 2. 세션 바디 생성
  const sessionBody = removeYaml(sessionTemplate)
    .replace(/{{duration}}/g, session.duration)
    .replace(/{{start_date}}/g, session.date.start.replace(/-/g, "."))
    .replace(/{{end_date}}/g, session.date.end.replace(/-/g, "."))
    .replace(/{{levels}}/g, session.levels.join(" and "))
    .replace(/{{challenges_text}}/g, sessionChallengesText);

  try {
    // 3. 세션 이슈 생성
    const { data: sessionIssue } = await github.rest.issues.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      title: `Session${SESSION_ID}: Week${sessionStartWeek} ~ Week${sessionEndWeek}`,
      body: sessionBody,
      assignees: [OWNER_ID],
      labels: ["goal", "programmers", "session", ...levelLabels],
    });

    console.log(`goal track session 생성 완료: #${sessionIssue.number}`);

    // 4. 위크 이슈 생성
    const sessionNodeId = sessionIssue.node_id;
    const childNodeIds = [];
    const membersStatusChecklist = Object.values(MEMBERS)
      .map((name) => `- [ ] ${name}`)
      .join("\n");

    //! (테스트용 2개)
    const weeks = session.challenges.slice(0, 2);

    for (const weekData of weeks) {
      const weekChallengesText = weekData.list.map((p) => `* ${p}`).join("\n");

      const weekBody = removeYaml(weekTemplate)
        .replace(/{{levels}}/g, session.levels.join(" and "))
        .replace(/{{start_date}}/g, weekData.start.replace(/-/g, "."))
        .replace(/{{end_date}}/g, weekData.end.replace(/-/g, "."))
        .replace(/{{challenges_text}}/g, weekChallengesText)
        .replace(/{{members_status_checklist}}/g, membersStatusChecklist);

      const { data: weekIssue } = await github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: `Week ${weekData.week}`,
        body: weekBody,
        assignees: [OWNER_ID],
        labels: ["goal", "programmers", ...levelLabels],
      });

      childNodeIds.push(weekIssue.node_id);
      console.log(
        `goal track week 생성 완료 ${weekData.week}: #${weekIssue.number}`,
      );
    }

    // 5. GraphQL Mutation을 통한 관계 연결
    for (const subIssueId of childNodeIds) {
      await github.graphql(
        `
        mutation($parentId: ID!, $subIssueId: ID!) {
          addSubIssue(input: {issueId: $parentId, subIssueId: $subIssueId}) {
            issue {
              id
              title
              }
              }
              }
        `,
        {
          parentId: sessionNodeId,
          subIssueId: subIssueId,
        },
      );
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
