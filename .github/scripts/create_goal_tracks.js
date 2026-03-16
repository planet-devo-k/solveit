import fs from "fs";
import path from "path";
import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { formatDateString } from "./utils/date.js";
import {
  removeYamlFrontmatter,
  replacePlaceholders,
} from "./utils/formatter.js";
import { createIssue, linkSubIssue } from "./utils/github.js";

export default async ({ github, context, core }) => {
  // const { PROJECT_ID, START_DATE_FIELD_ID, END_DATE_FIELD_ID } = process.env;
  const {
    WEEKS_PER_SESSION,
    PROGRAMMERS_ISSUE_NUMBER,
    PROGRAMMERS_MILESTONE_ID,
    PROGRAMMERS_BASE_URL,
  } = STUDY_CONFIG;
  // const ORG_NAME = context.repo.owner;
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

    const sessionIssue = await createIssue({
      github,
      context,
      title: `Session${SESSION_ID}: Week${sessionStartWeek} ~ Week${sessionEndWeek}`,
      body: sessionBody,
      assignees: [OWNER_ID],
      labels: ["goal", "programmers", "session", ...levelLabels],
      milestone: PROGRAMMERS_MILESTONE_ID,
    });

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

    console.log(`goal track session 생성 완료: #${sessionIssue.number}`);

    const membersStatusChecklist = Object.values(MEMBERS)
      .map((name) => `- [ ] ${name}`)
      .join("\n");

    //! (테스트용 1개)
    const weeksToCreate = session.challenges.slice(0, 1);

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
        title: `Week${weekData.week}`,
        body: weekBody,
        assignees: [OWNER_ID],
        labels: ["goal", "programmers", ...levelLabels],
      });

      await linkSubIssue({
        github,
        parentNodeId: sessionIssue.node_id,
        subIssueId: weekIssue.node_id,
      });

      console.log(
        `goal track week 생성 완료 ${weekData.week}: #${weekIssue.number}`,
      );
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
