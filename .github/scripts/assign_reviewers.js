import sessionData from "../data/session/session_6.json" with { type: "json" };
import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getThisWeekPRs, requestReviewers } from "./utils/github.js";
import { shuffleArray } from "./utils/math.js";
import { getKSTDateString } from "./utils/date.js";

export default async ({ github, context, core }) => {
  const { RULES } = STUDY_CONFIG;
  const { MIN_REVIEWS_REQUIRED } = RULES;
  const repo = context.repo.repo;
  const repoOwner = context.repo.owner;
  const currentPR = context.payload.pull_request;
  const prOwner = currentPR.user.login;
  const prNumber = currentPR.number;

  try {
    const { data: existingReviews } = await github.rest.pulls.listReviews({
      owner: repoOwner,
      repo,
      pull_number: prNumber,
    });

    const hasReviews = existingReviews.some((r) => r.user.login !== prOwner);

    if (currentPR.requested_reviewers?.length > 0 || hasReviews) {
      console.log("이미 리뷰어가 배정되어 있어 기존 목록을 유지합니다.");
      return null;
    }

    const nowStr = getKSTDateString(new Date());
    const currentWeekInfo = sessionData.challenges.find(
      (c) => nowStr >= c.date.start && nowStr <= c.date.end,
    );

    if (!currentWeekInfo) {
      console.log(`(${nowStr})는 현재 진행 중인 스터디 주차가 아닙니다.`);
      return null;
    }

    const thisWeekPRs = await getThisWeekPRs({
      github,
      context,
      startDate: new Date(currentWeekInfo.date.start),
      endDate: new Date(currentWeekInfo.date.end),
    });

    const reviewCounts = {};
    MEMBERS.forEach((m) => (reviewCounts[m.githubId] = 0));

    for (const pr of thisWeekPRs) {
      const reviewersSet = new Set();

      (pr.requested_reviewers || []).forEach((reviewer) => {
        reviewersSet.add(reviewer.login);
      });

      try {
        const { data: reviews } = await github.rest.pulls.listReviews({
          owner: repoOwner,
          repo,
          pull_number: pr.number,
        });

        reviews.forEach((review) => {
          if (review.user && review.user.login !== pr.user.login) {
            reviewersSet.add(review.user.login);
          }
        });
      } catch (error) {
        console.log(
          `PR #${pr.number}의 리뷰 목록을 가져오는데 실패했습니다:`,
          error.message,
        );
      }

      reviewersSet.forEach((login) => {
        if (reviewCounts[login] !== undefined) {
          reviewCounts[login]++;
        }
      });
    }

    let candidates = MEMBERS.filter((m) => m.githubId !== prOwner);

    candidates = shuffleArray(candidates);
    const grouped = {};
    candidates.forEach((c) => {
      const count = reviewCounts[c.githubId];
      if (!grouped[count]) grouped[count] = [];
      grouped[count].push(c);
    });

    const sorted = Object.keys(grouped)
      .sort((a, b) => a - b)
      .flatMap((count) => shuffleArray(grouped[count]));

    const selectedReviewers = sorted.slice(0, MIN_REVIEWS_REQUIRED);

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
