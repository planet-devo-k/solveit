import sessionData from "../data/session/session_6.json" with { type: "json" };
import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getThisWeekPRs, requestReviewers } from "./utils/github.js";
import { shuffleArray } from "./utils/math.js";
import { getKSTDateString } from "./utils/date.js";

export default async ({ github, context, core }) => {
  const { MIN_REVIEWS_REQUIRED } = STUDY_CONFIG;
  const currentPR = context.payload.pull_request;
  const prOwner = currentPR.user.login;
  const prNumber = currentPR.number;

  try {
    if (currentPR.requested_reviewers?.length > 0) {
      const existingReviewers = currentPR.requested_reviewers
        .map((r) => MEMBERS[r.login] || r.login)
        .join(", ");

      console.log("이미 리뷰어가 배정되어 있어 기존 목록을 유지합니다.");
      return existingReviewers;
    }

    const nowStr = getKSTDateString(new Date());
    const currentWeekInfo = sessionData.challenges.find(
      (c) => nowStr >= c.date.start && nowStr <= c.date.end,
    );

    if (!currentWeekInfo) {
      console.log(`(${nowStr})는 현재 진행 중인 스터디 주차가 아닙니다.`);
      return;
    }

    const thisWeekPRs = await getThisWeekPRs({
      github,
      context,
      startDate: new Date(currentWeekInfo.date.start),
      endDate: new Date(currentWeekInfo.date.end),
    });

    const reviewCounts = {};
    Object.keys(MEMBERS).forEach((id) => (reviewCounts[id] = 0));

    thisWeekPRs.forEach((pr) => {
      (pr.requested_reviewers || []).forEach((reviewer) => {
        if (reviewCounts[reviewer.login] !== undefined)
          reviewCounts[reviewer.login]++;
      });
    });

    let candidates = Object.keys(MEMBERS).filter(
      (id) => id !== prOwner && reviewCounts[id] < MIN_REVIEWS_REQUIRED,
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

    const selectedReviewersNames = selectedReviewers
      .map((id) => MEMBERS[id] || id)
      .join(", ");

    console.log(`리뷰어 배정 완료: ${selectedReviewersNames}`);

    return selectedReviewersNames;
  } catch (error) {
    console.error("리뷰어 배정 프로세스 중 에러:", error.message);
    core.setFailed(error.message);
    throw error;
  }
};
