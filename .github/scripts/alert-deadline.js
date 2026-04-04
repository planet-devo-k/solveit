import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getKSTDateString } from "./utils/date.js";
import { getLatestSessionData } from "./utils/session.js";
import { createDiscordTable } from "./utils/formatter.js";
import { getThisWeekPRs } from "./utils/github.js";

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
        console.log(`(${nowStr})는 현재 스터디 진행 기간이 아닙니다.`);
        return;
      }
    }

    console.log(`${currentWeekInfo.week}주차 PR 마감 사전 경고 시작`);

    const thisMonday = new Date(currentWeekInfo.date.start);
    const thisSunday = new Date(currentWeekInfo.date.end);
    const reviewDeadline = new Date(thisSunday.getTime() + 20 * 60 * 60 * 1000);

    const thisWeekPRs = await getThisWeekPRs({
      github,
      context,
      startDate: thisMonday,
      endDate: thisSunday,
    });

    const memberStatus = {};
    MEMBERS.forEach((member) => {
      memberStatus[member.githubId] = {
        name: member.name,
        githubId: member.githubId,
        discordId: member.discordId,
        submitted: false,
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

    // ─── 미수행자 필터링 (PR 미제출 또는 리뷰 미달) ───
    const incompleteMembers = Object.values(memberStatus).filter(
      (m) => !(m.submitted && m.hasMetReviewQuota),
    );

    const tableConfig = {
      headers: ["이름", "PR 제출", "리뷰(PR 기준)"],
      paddings: [6, 9, 6],
      renderRow: (id) => {
        const s = memberStatus[id];
        return {
          name: s.name || id,
          prStatus: s.submitted ? `✅ [PR](${s.prUrl})` : "❌",
          reviewStatus: `${s.reviewPrCount}/${MIN_REVIEWS_REQUIRED}`,
        };
      },
    };

    const incompleteTable =
      incompleteMembers.length > 0
        ? createDiscordTable(
            incompleteMembers.map((m) => m.githubId),
            tableConfig,
          )
        : null;

    if (incompleteMembers.length === 0) {
      console.log("모든 멤버가 과제를 완료했습니다.");
    } else {
      console.log(
        `미수행자: ${incompleteMembers.map((m) => m.name).join(", ")}`,
      );
    }

    return {
      incompleteTable,
      incompleteMembers,
    };
  } catch (error) {
    console.error("PR 마감 경고 집계 실패:", error.message);
    core.setFailed(error.message);
    throw error;
  }
};
