import sessionData from "../data/session/session_6.json" with { type: "json" };
import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getThisWeekPRs, requestReviewers } from "./utils/github.js";
import { shuffleArray } from "./utils/math.js";
import { getKSTDateString } from "./utils/date.js";

export default async ({ github, context, core }) => {
  const { RULES } = STUDY_CONFIG;
  const { MIN_REVIEWS_REQUIRED } = RULES;
  const currentPR = context.payload.pull_request;
  const prOwner = currentPR.user.login;
  const prNumber = currentPR.number;

  try {
    if (currentPR.requested_reviewers?.length > 0) {
      const existingReviewers = currentPR.requested_reviewers
        .map((r) => {
          const member = MEMBERS.find((m) => m.githubId === r.login);
          return member ? member.name : r.login;
        })
        .join(", ");

      console.log("이미 리뷰어가 배정되어 있어 기존 목록을 유지합니다.");
      return null;
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
    MEMBERS.forEach((m) => (reviewCounts[m.githubId] = 0));

    thisWeekPRs.forEach((pr) => {
      (pr.requested_reviewers || []).forEach((reviewer) => {
        if (reviewCounts[reviewer.login] !== undefined)
          reviewCounts[reviewer.login]++;
      });
    });

    let candidates = MEMBERS.filter(
      (m) =>
        m.githubId !== prOwner &&
        reviewCounts[m.githubId] < MIN_REVIEWS_REQUIRED,
    );

    if (candidates.length < 2) {
      candidates = MEMBERS.filter((m) => m.githubId !== prOwner);
    }

    const selectedReviewers = shuffleArray(candidates).slice(0, 2);

    const selectedReviewersGithubId = selectedReviewers.map((m) => m.githubId);

    await requestReviewers({
      github,
      context,
      pullNumber: prNumber,
      reviewers: selectedReviewersGithubId,
    });

    console.log(`리뷰어 배정 완료: ${selectedReviewersGithubId}`);

    return { reviewers: selectedReviewers };
  } catch (error) {
    console.error("리뷰어 배정 프로세스 중 에러:", error.message);
    core.setFailed(error.message);
    throw error;
  }
};
