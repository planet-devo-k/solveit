import sessionData from "../data/session/session_6.json" with { type: "json" };
import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getKSTDateString } from "./utils/date.js";
import { createDiscordTable, createMarkdownTable } from "./utils/formatter.js";
import {
  getThisWeekPRs,
  getDiscussionCategories,
  createDiscussion,
  addLabelByName,
  getRepositoryInfo,
} from "./utils/github.js";

export default async ({ github, context, core }) => {
  const { RULES } = STUDY_CONFIG;
  const { MIN_REVIEWS_REQUIRED } = RULES;

  try {
    const nowStr = getKSTDateString(new Date());
    const currentWeekInfo = sessionData.challenges.find(
      (c) => nowStr >= c.date.start && nowStr <= c.date.end,
    );

    if (!currentWeekInfo) {
      console.warn(`(${nowStr})는 현재 스터디 진행 기간이 아닙니다.`);
      return;
    }

    const currentAbsentees = currentWeekInfo.absentees;
    const thisMonday = new Date(currentWeekInfo.date.start);
    const thisSunday = new Date(currentWeekInfo.date.end);
    const prDeadline = new Date(thisSunday.getTime());
    const reviewDeadline = new Date(thisSunday.getTime() + 20 * 60 * 60 * 1000);

    console.log(`${currentWeekInfo.week}주차 모니터링 시작`);

    const thisWeekPRs = await getThisWeekPRs({
      github,
      context,
      startDate: thisMonday,
      endDate: prDeadline,
    });
    console.log(`이번주 PR 개수 = ${thisWeekPRs.length}`);

    const memberStatus = {};
    MEMBERS.forEach((member) => {
      memberStatus[member.githubId] = {
        name: member.name,
        githubId: member.githubId,
        discordId: member.discordId,
        submitted: false,
        prUrl: "",
        reviewPrCount: 0,
        hasMetReviewQuota: false,
      };
    });

    await Promise.all(
      thisWeekPRs.map(async (pr) => {
        const author = pr.user.login;

        if (memberStatus[author]) {
          memberStatus[author].submitted = true;
          memberStatus[author].prUrl = pr.html_url;
        }

        const { data: reviews } = await github.rest.pulls.listReviews({
          owner: context.repo.owner,
          repo: context.repo.repo,
          pull_number: pr.number,
        });

        const validReviews = reviews.filter((r) => {
          const submittedAt = new Date(r.submitted_at);
          return submittedAt >= thisMonday && submittedAt <= reviewDeadline;
        });

        const uniqueReviewersOnPr = new Set(
          validReviews.map((r) => r.user.login),
        );

        uniqueReviewersOnPr.forEach((reviewerId) => {
          const isStudyMember = memberStatus[reviewerId];
          const isNotOwnPr = reviewerId !== author;
          if (isStudyMember && isNotOwnPr) {
            memberStatus[reviewerId].reviewPrCount++;
          }
        });
      }),
    );

    const memberIds = MEMBERS.map((m) => m.githubId);
    memberIds.forEach((id) => {
      const status = memberStatus[id];
      if (status.reviewPrCount >= MIN_REVIEWS_REQUIRED) {
        status.hasMetReviewQuota = true;
      }
    });

    const getTableConfig = (includeAttendance = false) => {
      const headers = ["이름", "PR 제출", "리뷰(PR 기준)"];
      const paddings = [6, 9, 6];

      if (includeAttendance) {
        headers.push("출석");
        paddings.push(6);
      }

      return {
        headers,
        paddings,
        renderRow: (id) => {
          const s = memberStatus[id];
          const prStatus = s.submitted ? "✅" : "❌";
          const reviewStatus = `${s.reviewPrCount}/${MIN_REVIEWS_REQUIRED}`;

          const rowData = { name: s.name || id, prStatus, reviewStatus };

          if (includeAttendance) {
            const isPresent = !currentAbsentees.includes(id);
            rowData.attendance = isPresent ? "✅" : "❌";
          }

          return rowData;
        },
      };
    };

    const incompleteMembers = Object.values(memberStatus).filter(
      (m) => !(m.submitted && m.hasMetReviewQuota),
    );

    const discordIncompleteAlertTable =
      incompleteMembers.length > 0
        ? createDiscordTable(
            incompleteMembers.map((m) => m.githubId),
            getTableConfig(false),
          )
        : null;

    console.log("이번주 리포트 생성 중...");
    const allTable = createMarkdownTable(memberIds, getTableConfig(true));
    const reportTitle = `\`Week${currentWeekInfo.week}\` 주간 활동 리포트`;
    const reportBody = `## THIS WEEK REPORT\n\n${allTable}\n\n집계 시각: ${getKSTDateString(new Date())} 20:00 (KST)`;

    const repository = await getRepositoryInfo({ github, context });
    const categories = await getDiscussionCategories({ github, context });
    const categoryReport = categories.find((cat) =>
      cat.name.toLowerCase().includes("report"),
    );

    let thisWeekReportResult = null;

    if (categoryReport) {
      const thisWeekReport = await createDiscussion({
        github,
        repoId: repository.id,
        categoryId: categoryReport.id,
        title: reportTitle,
        body: reportBody,
      });

      await addLabelByName({
        github,
        context,
        nodeId: thisWeekReport.id,
        labelName: "report",
      });

      thisWeekReportResult = {
        title: reportTitle,
        url: `https://github.com/${context.repo.owner}/${context.repo.repo}/discussions/${thisWeekReport.number}`,
        category: { name: categoryReport.name },
      };
    }

    console.log("주간 모니터링 보고 완료");

    return {
      incompleteTable: discordIncompleteAlertTable,
      reportData: thisWeekReportResult,
      incompleteMembers: incompleteMembers,
    };
  } catch (error) {
    console.error("모니터링 프로세스 중 에러 발생:", error.message);
    core.setFailed(error.message);
    throw error;
  }
};
