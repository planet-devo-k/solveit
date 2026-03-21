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
    candidates.sort(
      (a, b) => reviewCounts[a.githubId] - reviewCounts[b.githubId],
    );

    const selectedReviewers = candidates.slice(0, 2);

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
