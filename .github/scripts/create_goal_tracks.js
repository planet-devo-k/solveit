import fs from "fs";
import path from "path";
import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { formatDateString } from "./utils/date.js";
import {
  removeYamlFrontmatter,
  replacePlaceholders,
} from "./utils/formatter.js";
import {
  createIssue,
  linkSubIssue,
  syncIssueToProject,
} from "./utils/github.js";

export default async ({ github, context, core }) => {
  const {
    PROJECT_ID,
    PROJECT_STATUS_ID,
    START_DATE_FIELD_ID,
    END_DATE_FIELD_ID,
  } = process.env;
  const {
    PROJECT_STATUS_OPTIONS,
    WEEKS_PER_SESSION,
    PROGRAMMERS_ISSUE_NUMBER,
    PROGRAMMERS_MILESTONE_ID,
    PROGRAMMERS_BASE_URL,
  } = STUDY_CONFIG;
  // const { owner, repo } = context.repo;
  const ASSIGNEE_ID = "sgoldenbird";
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

  const challengeLink = (c) => {
    return `[${c.name}](${PROGRAMMERS_BASE_URL}/${c.id})`;
  };

  try {
    const sessionChallengesText = session.challenges
      .map((c) => {
        const start = formatDateString(c.date.start);
        const end = formatDateString(c.date.end);
        const dateRange = `**week${c.week}** ${start} MON - ${end} SUN`;
        const thisWeekChallenges =
          c.list.length > 0
            ? c.list.map((c) => `  * ${challengeLink(c)}`).join("\n")
            : "  * 미정";
        return `${dateRange}\n\n${thisWeekChallenges}`;
      })
      .join("\n\n");

    const sessionBody = replacePlaceholders(
      removeYamlFrontmatter(sessionTemplate),
      {
        duration: WEEKS_PER_SESSION,
        start_date: formatDateString(session.date.start),
        end_date: formatDateString(session.date.end),
        levels: session.levels.join(" and "),
        challenges_text: sessionChallengesText,
      },
    );

    console.log("마일스톤 번호:", PROGRAMMERS_MILESTONE_ID);
    console.log("담당자 ID:", ASSIGNEE_ID);

    const sessionIssue = await createIssue({
      github,
      context,
      title: `\`Session${SESSION_ID}: Week${sessionStartWeek} ~ Week${sessionEndWeek}\``,
      body: sessionBody,
      assignees: [ASSIGNEE_ID],
      labels: ["goal", "programmers", "session", ...levelLabels],
      milestone: Number(PROGRAMMERS_MILESTONE_ID),
    });

    console.log(`goal track session 생성 완료: #${sessionIssue.number}`);

    const membersStatusChecklist = Object.values(MEMBERS)
      .map((name) => `- [ ] ${name}`)
      .join("\n");

    const weeksToCreate = session.challenges.slice(0, 1);
    const createdWeekIssues = [];

    for (const weekData of weeksToCreate) {
      const weekChallengesText = weekData.list
        .map((c) => `* ${challengeLink(c)}`)
        .join("\n");

      const weekBody = replacePlaceholders(
        removeYamlFrontmatter(weekTemplate),
        {
          levels: session.levels.join(" and "),
          start_date: formatDateString(weekData.date.start),
          end_date: formatDateString(weekData.date.end),
          challenges_text: weekChallengesText,
          members_status_checklist: membersStatusChecklist,
        },
      );

      const weekIssue = await createIssue({
        github,
        context,
        title: `\`Week${weekData.week}\``,
        body: weekBody,
        assignees: [ASSIGNEE_ID],
        labels: ["goal", "programmers", ...levelLabels],
      });

      console.log(
        `goal track week 생성 완료 ${weekData.week}: #${weekIssue.number}`,
      );
      createdWeekIssues.push({ data: weekData, issue: weekIssue });

      // API 호출 간격 유지
      await new Promise((res) => setTimeout(res, 1000));
    }

    console.log(
      "이슈 생성이 모두 완료되었습니다. 속성 안정화를 위해 3초 대기합니다...",
    );
    await new Promise((res) => setTimeout(res, 3000));

    await syncIssueToProject({
      github,
      projectId: PROJECT_ID,
      contentId: sessionIssue.node_id,
      startDateFieldId: START_DATE_FIELD_ID,
      endDateFieldId: END_DATE_FIELD_ID,
      startDate: session.date.start,
      endDate: session.date.end,
      statusFieldId: PROJECT_STATUS_ID,
      statusOptionId: PROJECT_STATUS_OPTIONS.IN_PROGRESS,
    });
    console.log("Session 이슈 프로젝트 연동 완료");

    for (const { data, issue } of createdWeekIssues) {
      await syncIssueToProject({
        github,
        projectId: PROJECT_ID,
        contentId: issue.node_id,
        startDateFieldId: START_DATE_FIELD_ID,
        endDateFieldId: END_DATE_FIELD_ID,
        startDate: data.date.start,
        endDate: data.date.end,
        statusFieldId: PROJECT_STATUS_ID,
        statusOptionId: PROJECT_STATUS_OPTIONS.TODO,
      });
      console.log(`Week 이슈 프로젝트 연동 완료: #${issue.number}`);
    }

    const { data: programmersParent } = await github.rest.issues.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: PROGRAMMERS_ISSUE_NUMBER,
    });

    await linkSubIssue({
      github,
      parentNodeId: programmersParent.node_id,
      subIssueId: sessionIssue.node_id,
    });

    for (const { issue } of createdWeekIssues) {
      await linkSubIssue({
        github,
        parentNodeId: sessionIssue.node_id,
        subIssueId: issue.node_id,
      });
    }

    console.log("모든 작업이 완료되었습니다.");
  } catch (error) {
    core.setFailed(error.message);
  }
};
