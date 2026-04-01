import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getKSTDateString } from "./utils/date.js";
import { getLatestSessionData } from "./utils/session.js";
import { createMarkdownTable } from "./utils/formatter.js";
import {
  getThisWeekPRs,
  getDiscussionCategories,
  createDiscussion,
  addLabelByName,
  getRepositoryInfo,
} from "./utils/github.js";

export default async ({ github, context, core, test }) => {
  const { RULES } = STUDY_CONFIG;
  const { MIN_REVIEWS_REQUIRED } = RULES;

  try {
    const sessionData = getLatestSessionData();

    let currentWeekInfo;

    if (test !== null) {
      currentWeekInfo = sessionData.challenges.find((c) => c.week === test);
      if (!currentWeekInfo) {
        console.warn(`테스트 주차(${test})를 찾을 수 없습니다.`);
        return;
      }
      console.log(`[테스트 모드] ${test}주차 강제 지정`);
    } else {
      const nowStr = getKSTDateString(new Date());
      currentWeekInfo = sessionData.challenges.find(
        (c) => nowStr >= c.date.start && nowStr <= c.date.end,
      );
      if (!currentWeekInfo) {
        console.warn(
          `(${getKSTDateString(new Date())})는 현재 스터디 진행 기간이 아닙니다.`,
        );
        return;
      }
    }

    console.log(`${currentWeekInfo.week}주차 모니터링 시작`);

    const thisMonday = new Date(currentWeekInfo.date.start);
    const thisSunday = new Date(currentWeekInfo.date.end);
    const reviewDeadline = new Date(thisSunday.getTime() + 20 * 60 * 60 * 1000);

    const thisWeekPRs = await getThisWeekPRs({
      github,
      context,
      startDate: thisMonday,
      endDate: thisSunday,
    });
    console.log(`이번주 PR 개수 = ${thisWeekPRs.length}`);

    // ─── 멤버 상태 초기화 ───
    const memberStatus = {};
    MEMBERS.forEach((member) => {
      memberStatus[member.githubId] = {
        name: member.name,
        githubId: member.githubId,
        submitted: false,
        prUrl: "",
        reviewPrCount: 0,
        hasMetReviewQuota: false,
      };
    });

    // ─── PR 제출 + 리뷰 집계 ───
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

    // ─── 리뷰 쿼터 체크 ───
    const memberIds = MEMBERS.map((m) => m.githubId);
    memberIds.forEach((id) => {
      const status = memberStatus[id];
      if (status.reviewPrCount >= MIN_REVIEWS_REQUIRED) {
        status.hasMetReviewQuota = true;
      }
    });

    // ─── 테이블 구성 ───
    const tableConfig = {
      headers: ["이름", "PR 제출", "리뷰(PR 기준)", "출석"],
      paddings: [6, 9, 6, 6],
      renderRow: (id) => {
        const s = memberStatus[id];
        return {
          name: s.name || id,
          prStatus: s.submitted ? `✅ [PR](${s.prUrl})` : "❌",
          reviewStatus: `${s.reviewPrCount}/${MIN_REVIEWS_REQUIRED}`,
          attendance: "✅",
        };
      },
    };

    // ─── 주간 리포트 생성 ───
    console.log("이번주 리포트 생성 중...");
    const allTable = createMarkdownTable(memberIds, tableConfig);
    const reportTitle = `\`Week${currentWeekInfo.week}\` 주간 활동 리포트`;
    const reportBody = [
      `## THIS WEEK REPORT`,
      ``,
      `**${currentWeekInfo.date.start} ~ ${currentWeekInfo.date.end}**`,
      ``,
      allTable,
      ``,
      `> 집계 시각: ${getKSTDateString(new Date())} 20:00 (KST)`,
    ].join("\n");

    // ─── GitHub Discussion 생성 ───
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
      reportData: thisWeekReportResult,
    };
  } catch (error) {
    console.error("모니터링 프로세스 중 에러 발생:", error.message);
    core.setFailed(error.message);
    throw error;
  }
};
