export default async ({ github, context, core }) => {
  const { MEMBERS, RULES } = await import("./utils/constants.js");
  const { getThisMondayKST, getPrDeadlinesKST } =
    await import("./utils/date.js");
  const { requestReviewers, getThisWeekPullRequests } =
    await import("./utils/github.js");
  const { shuffleArray } = await import("./utils/math.js");

  const prOwner = context.payload.pull_request.user.login;
  const prNumber = context.issue.number;

  try {
    // 1. merge전에 다시 push했을 때 중복 배정 방지 로직: 이미 리뷰어가 배정되어 있는지 확인
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

    // 2. 이번 주 월요일(00:00), 토요일(23:59:59) 날짜 계산
    const thisMonday = getThisMondayKST(new Date());
    const { prDeadline, reviewDeadline } = getPrDeadlinesKST(thisMonday);

    // 3. 이번 주에 생성된 모든 PR 목록 조회
    const thisWeekPRs = await getThisWeekPullRequests({
      github,
      context,
      thisMonday,
      prDeadline,
    });

    // 4. 팀원별 '공식 요청된' 리뷰 횟수 카운트
    const reviewCounts = {};
    MEMBERS.forEach((member) => (reviewCounts[member] = 0));

    for (const pr of thisWeekPRs) {
      // 자발적 참여자가 아닌, 시스템이 '요청(Requested)'한 리뷰어만 필터링
      const requestedReviewers = pr.requested_reviewers || [];

      requestedReviewers.forEach((user) => {
        if (reviewCounts[user.login] !== undefined) {
          reviewCounts[user.login]++;
        }
      });
    }

    console.log("주간 리뷰 배정 현황:", reviewCounts);

    // 5. 후보군 필터링 (본인 제외 & 횟수 미달자 우선)
    let candidates = MEMBERS.filter(
      (member) =>
        member !== prOwner && reviewCounts[member] < RULES.MIN_REVIEWS_PER_WEEK,
    );

    // 만약 후보가 부족하면(모두가 횟수를 채웠으면) 전체 랜덤으로 전환
    if (candidates.length < 2) {
      candidates = MEMBERS.filter((member) => member !== prOwner);
    }

    // 6. 랜덤 셔플 (Fisher-Yates)
    const selectedReviewers = shuffleArray(candidates).slice(0, 2);

    // 7. 결과 반영 (리뷰어 지정)
    await requestReviewers({
      github,
      context,
      pullNumber: prNumber,
      reviewers: selectedReviewers,
    });

    // 8. 디스코드 알림을 위한 데이터 전달
    core.setOutput(
      "reviewers",
      selectedReviewers.map((r) => `@${r}`).join(", "),
    );

    console.log(`리뷰어 배정 완료: ${selectedReviewers.join(", ")}`);
  } catch (error) {
    console.error("리뷰어 배정 프로세스 중 에러:", error.message);
    core.setFailed(error.message);
  }
};
