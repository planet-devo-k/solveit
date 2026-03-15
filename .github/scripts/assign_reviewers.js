export default async ({ github, context, core }) => {
  // 1. 스터디 설정
  const team = ["sgoldenbird", "pappaya109", "yuj2n", "Insung-Jo"];
  const MIN_REVIEWS_PER_WEEK = 2;

  const prOwner = context.payload.pull_request.user.login;
  const prNumber = context.issue.number;

  try {
    // 2. 중복 배정 방지 로직: 이미 리뷰어가 배정되어 있는지 확인
    const { data: currentPR } = await github.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
    });

    if (
      currentPR.requested_reviewers &&
      currentPR.requested_reviewers.length > 0
    ) {
      const existingReviewers = currentPR.requested_reviewers
        .map((r) => `@${r.login}`)
        .join(", ");

      console.log("이미 리뷰어가 배정되어 있어 기존 목록을 유지합니다.");
      core.setOutput("reviewers", existingReviewers);
      return;
    }

    // 3. 이번 주 월요일(00:00) 날짜 계산
    const now = new Date();
    const day = now.getDay();
    const mondayDate = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(mondayDate));
    monday.setHours(0, 0, 0, 0);

    // 4. 이번 주에 생성된 모든 PR 목록 조회
    const { data: pullRequests } = await github.rest.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "all",
      sort: "created",
      direction: "desc",
    });

    const thisWeekPRs = pullRequests.filter(
      (pr) => new Date(pr.created_at) >= monday,
    );

    // 5. 팀원별 '공식 요청된' 리뷰 횟수 카운트
    const reviewCounts = {};

    team.forEach((member) => (reviewCounts[member] = 0));

    for (const pr of thisWeekPRs) {
      // 자발적 참여자가 아닌, 시스템이 '요청(Requested)'한 리뷰어만 필터링
      const { data: requested } =
        await github.rest.pulls.listRequestedReviewers({
          owner: context.repo.owner,
          repo: context.repo.repo,
          pull_number: pr.number,
        });

      requested.users.forEach((user) => {
        if (reviewCounts[user.login] !== undefined) {
          reviewCounts[user.login]++;
        }
      });
    }

    console.log("주간 리뷰 배정 현황:", reviewCounts);

    // 6. 후보군 필터링 (본인 제외 & 횟수 미달자 우선)
    let candidates = team.filter(
      (member) =>
        member !== prOwner && reviewCounts[member] < MIN_REVIEWS_PER_WEEK,
    );

    // 만약 후보가 부족하면(모두가 횟수를 채웠으면) 전체 랜덤으로 전환
    if (candidates.length < 2) {
      candidates = team.filter((member) => member !== prOwner);
    }

    // 7. 랜덤 셔플 (Fisher-Yates)
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    const selectedReviewers = candidates.slice(0, 2);

    // 8. 결과 반영 (리뷰어 지정)
    await github.rest.pulls.requestReviewers({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: prNumber,
      reviewers: selectedReviewers,
    });

    // 9. 디스코드 알림을 위한 데이터 전달
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
