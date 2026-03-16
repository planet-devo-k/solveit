import fs from "fs";
import path from "path";
import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";

export default async ({ github, context, core }) => {
  const { PROJECT_ID, START_DATE_FIELD_ID, END_DATE_FIELD_ID } = process.env;
  const {
    WEEKS_PER_SESSION,
    PROGRAMMERS_ISSUE_NUMBER,
    PROGRAMMERS_MILESTONE_ID,
    PROGRAMMERS_BASE_URL,
  } = STUDY_CONFIG;
  const ORG_NAME = context.repo.owner;
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
  const removeYamlFrontmatter = (text) =>
    text.replace(/^---[\s\S]*?---/, "").trim();
  const challengeLink = (c) => {
    return `[${c.name}](${PROGRAMMERS_BASE_URL}/${c.id})`;
  };

  const updateProjectDates = async (contentId, startDate, endDate) => {
    try {
      // 1. 프로젝트에 아이템 추가 (PROJECT_ID는 PVT_로 시작하는 노드 ID여야 함)
      const addRes = await github.graphql(
        `mutation($projectId: ID!, $contentId: ID!) {
          addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
            item { id }
          }
        }`,
        { projectId: PROJECT_ID, contentId },
      );

      const itemId = addRes.addProjectV2ItemById.item.id;

      // 2. 필드 값 업데이트 (Start Date / End Date)
      const updateField = async (fieldId, value) => {
        await github.graphql(
          `mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: String!) {
            updateProjectV2ItemFieldValue(input: {
              projectId: $projectId, 
              itemId: $itemId, 
              fieldId: $fieldId, 
              value: { date: $value }
            }) {
              projectV2Item { id }
            }
          }`,
          {
            projectId: PROJECT_ID, // 💡 projectNodeId 대신 PROJECT_ID로 통일
            itemId,
            fieldId,
            value,
          },
        );
      };

      await updateField(START_DATE_FIELD_ID, startDate);
      await updateField(END_DATE_FIELD_ID, endDate);
      console.log(
        `프로젝트 연동 및 날짜 설정 완료 (${startDate} ~ ${endDate})`,
      );
    } catch (e) {
      console.error(`프로젝트 연동 실패: ${e.message}`);
    }
  };

  // 하위 이슈 연결 유틸리티 함수
  const linkSubIssue = async (parentId, subIssueId) => {
    await github.graphql(
      `mutation($parentId: ID!, $subIssueId: ID!) {
      addSubIssue(input: {issueId: $parentId, subIssueId: $subIssueId}) {
        issue { id }
      }
    }`,
      { parentId, subIssueId },
    );
  };

  // 이슈 생성 및 템플릿 치환 공통 함수
  const createIssue = async ({ title, body, labels, milestone = null }) => {
    const { data } = await github.rest.issues.create({
      owner: context.repo.owner,
      repo: context.repo.repo,
      title,
      body,
      assignees: [OWNER_ID],
      labels,
      milestone,
    });
    return data;
  };

  const replacePlaceholders = (template, data) => {
    let result = template;
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      result = result.replace(regex, value);
    });
    return result;
  };

  try {
    const sessionChallengesText = session.challenges
      .map((c) => {
        const dateRange = `**week${c.week}** ${c.date.start.replace(/-/g, ".")} MON - ${c.date.end.replace(/-/g, ".")} SUN`;
        const thisWeekChallenges =
          c.list.length > 0
            ? c.list.map((p) => `  * ${challengeLink(p)}`).join("\n")
            : "  * 미정";
        return `${dateRange}\n\n${thisWeekChallenges}`;
      })
      .join("\n\n");

    const sessionBody = replacePlaceholders(
      removeYamlFrontmatter(sessionTemplate),
      {
        duration: WEEKS_PER_SESSION,
        start_date: session.date.start.replace(/-/g, "."),
        end_date: session.date.end.replace(/-/g, "."),
        levels: session.levels.join(" and "),
        challenges_text: sessionChallengesText,
      },
    );

    const sessionIssue = await createIssue({
      title: `Session${SESSION_ID}: Week${sessionStartWeek} ~ Week${sessionEndWeek}`,
      body: sessionBody,
      labels: ["goal", "programmers", "session", ...levelLabels],
      milestone: PROGRAMMERS_MILESTONE_ID,
    });
    const sessionNodeId = sessionIssue.node_id;

    // --- 143번 이슈를 부모로 연결 ---
    const { data: programmersParent } = await github.rest.issues.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: PROGRAMMERS_ISSUE_NUMBER,
    });

    await linkSubIssue(programmersParent.node_id, sessionNodeId);

    await updateProjectDates(
      sessionIssue.node_id,
      session.date.start,
      session.date.end,
    );

    console.log(`goal track session 생성 완료: #${sessionIssue.number}`);

    const membersStatusChecklist = Object.values(MEMBERS)
      .map((name) => `- [ ] ${name}`)
      .join("\n");

    //! (테스트용 2개)
    const weeks = session.challenges.slice(0, 2);

    for (const weekData of weeks) {
      const weekChallengesText = weekData.list
        .map((p) => `* ${challengeLink(p)}`)
        .join("\n");

      const weekBody = replacePlaceholders(
        removeYamlFrontmatter(weekTemplate),
        {
          levels: session.levels.join(" and "),
          start_date: weekData.date.start.replace(/-/g, "."),
          end_date: weekData.date.end.replace(/-/g, "."),
          challenges_text: weekChallengesText,
          members_status_checklist: membersStatusChecklist,
        },
      );
      const weekIssue = await createIssue({
        title: `Week${weekData.week}`,
        body: weekBody,
        labels: ["goal", "programmers", ...levelLabels],
      });

      await updateProjectDates(
        weekIssue.node_id,
        weekData.date.start,
        weekData.date.end,
      );

      await linkSubIssue(sessionNodeId, weekIssue.node_id);

      console.log(
        `goal track week 생성 완료 ${weekData.week}: #${weekIssue.number}`,
      );
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
