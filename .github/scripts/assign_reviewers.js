import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getThisWeekPullRequests, requestReviewers } from "./utils/github.js";
import { shuffleArray } from "./utils/math.js";
import sessionData from "../data/session/session_6.json" with { type: "json" };
import { formatDateKST } from "./utils/date.js";

export default async ({ github, context, core }) => {
  const prOwner = context.payload.pull_request.user.login;
  const prNumber = context.issue.number;

  try {
    const { data: currentPR } = await github.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
    });

    if (currentPR.requested_reviewers?.length > 0) {
      const existingReviewers = currentPR.requested_reviewers
        .map((r) => `@${r.login}`)
        .join(", ");

      console.log("이미 리뷰어가 배정되어 있어 기존 목록을 유지합니다.");
      core.setOutput("reviewers", existingReviewers);
      return;
    }

    const nowStr = formatDateKST(new Date()).replace(/\./g, "-");
    const currentWeekInfo = sessionData.challenges.find(
      (c) => nowStr >= c.date.start && nowStr <= c.date.end,
    );

    if (!currentWeekInfo) {
      console.log(`(${nowStr})는 현재 진행 중인 스터디 주차가 아닙니다.`);
      return;
    }

    const thisWeekPRs = await getThisWeekPullRequests({
      github,
      context,
      thisMonday: new Date(currentWeekInfo.date.start),
      thisSaturday: new Date(currentWeekInfo.date.end),
    });

    const reviewCounts = {};
    Object.keys(MEMBERS).forEach((id) => (reviewCounts[id] = 0));

    thisWeekPRs.forEach((pr) => {
      (pr.requested_reviewers || []).forEach((reviewer) => {
        if (reviewCounts[reviewer.login] !== undefined)
          reviewCounts[reviewer.login]++;
      });
    });

    console.log("주간 리뷰 배정 현황:", reviewCounts);

    let candidates = Object.keys(MEMBERS).filter(
      (id) =>
        id !== prOwner && reviewCounts[id] < STUDY_CONFIG.MIN_REVIEWS_REQUIRED,
    );

    if (candidates.length < 2) {
      candidates = Object.keys(MEMBERS).filter((id) => id !== prOwner);
    }

    const selectedReviewers = shuffleArray(candidates).slice(0, 2);

    await requestReviewers({
      github,
      context,
      pullNumber: prNumber,
      reviewers: selectedReviewers,
    });

    // 디스코드 알림을 위한 데이터 전달
    const selectedReviewersNames = selectedReviewers
      .map((id) => MEMBERS[id] || id)
      .join(", ");

    core.setOutput("reviewers", selectedReviewersNames);

    console.log(`리뷰어 배정 완료: ${selectedReviewersNames}`);
  } catch (error) {
    console.error("리뷰어 배정 프로세스 중 에러:", error.message);
    core.setFailed(error.message);
  }
};
