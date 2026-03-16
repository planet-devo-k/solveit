export default async ({ github, context, core }) => {
  const { MEMBERS, RULES } = await import("./utils/constants.js");
  const { formatDateKST, getThisMondayKST, getDeadlinesKST } =
    await import("./utils/date.js");
  const {
    getThisWeekPullRequests,
    findSessionDiscussion,
    getDiscussionCategory,
    createDiscussion,
    updateDiscussion,
  } = await import("./utils/github.js");
  const { getMetadata } = await import("./utils/parser.js");
  const { sendDiscord } = await import("./utils/discord.js");

  try {
    const now = new Date();
    const monday = getThisMondayKST(now);
    const { prDeadline, reviewDeadline } = getDeadlinesKST(monday);

    // 이번 주 일요일 날짜를 미리 계산
    const thisSundayDate = formatDateKST(reviewDeadline);
    console.log(`조회 기준 날짜 (KST): ${thisSundayDate}`);

    // 1. 'goal' 이슈에서 세션 메타데이터 추출 및 제목 설정
    const { data: issues } = await github.rest.issues.listForRepo({
      owner: context.repo.owner,
      repo: context.repo.repo,
      labels: "goal",
      state: "open",
      per_page: 20,
    });

    console.log(`찾은 goal 이슈 개수: ${issues.length}개`);

    // 2. 현재 주차에 맞는 goal 이슈 찾기
    const thisWeekGoal = issues.find((issue) => {
      try {
        const deadlineStr = getMetadata(
          issue.body,
          /Deadline:\s*(.*)/,
          "Deadline",
        );

        // 날짜가 포함되어 있는지 확인
        const isMatch = deadlineStr.includes(thisSundayDate);
        console.log(
          `이슈 제목: ${issue.title} | Deadline: ${deadlineStr} | 매칭결과: ${isMatch}`,
        );
        return isMatch;
      } catch (e) {
        return false;
      }
    });

    if (!thisWeekGoal) {
      throw new Error(
        `현재 주차(${thisSundayDate})에 해당하는 goal 이슈를 찾을 수 없습니다. 레이블이나 본문의 Deadline을 확인해주세요.`,
      );
    }

    const thisWeekTitle = thisWeekGoal.title;

    // 3. 이번 주 PR 목록 조회 (토요일 마감 시한 적용)
    const thisWeekPRs = await getThisWeekPullRequests({
      github,
      context,
      thisMonday: monday,
      thisSaturday: prDeadline,
    });

    // 4. 멤버별 활동 현황 데이터 구조 초기화
    const memberStatus = {};
    MEMBERS.forEach((member) => {
      memberStatus[member] = {
        submitted: false,
        prUrl: "",
        reviewPrCount: 0,
        hasMetReviewQuota: false,
      };
    });

    // 5. PR 및 리뷰 활동 분석
    for (const pr of thisWeekPRs) {
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

      // [리뷰 필터링] 월요일 00:00 ~ 일요일 20:00 사이 작성된 리뷰만 인정
      const validReviews = reviews.filter((r) => {
        const submittedAt = new Date(r.submitted_at);
        return submittedAt >= monday && submittedAt <= reviewDeadline;
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
    }

    // 6. 규칙 준수 여부 판별
    MEMBERS.forEach((member) => {
      const status = memberStatus[member];
      if (status.reviewPrCount >= RULES.MIN_REVIEWS_PER_WEEK) {
        status.hasMetReviewQuota = true;
      }
    });

    // 7. 디스코드 리포트 (미완료 멤버 위주)
    const incompleteMembers = MEMBERS.filter((m) => {
      const s = memberStatus[m];
      return !(s.submitted && s.hasMetReviewQuota);
    });

    if (incompleteMembers.length > 0) {
      const reportFields = incompleteMembers.map((m) => {
        const s = memberStatus[m];
        return {
          name: `${m}`,
          value: `PR제출: ${s.submitted ? "✅" : "❌"} | 리뷰: ${s.hasMetReviewQuota ? "✅" : "❌"} (${s.reviewPrCount}/${RULES.MIN_REVIEWS_PER_WEEK})`,
          inline: false,
        };
      });

      // 8. 디스코드 전송
      await sendDiscord({
        channelId: process.env.DISCORD_CHANNEL_ID,
        botToken: process.env.BOT_TOKEN,
        payload: {
          content: "이번 주 스터디 활동 현황 보고",
          embeds: [
            {
              title: "THIS WEEK REPORT\n━━━━━━━━━━━━━━━━━━━━━━",
              color: 3447003,
              fields: reportFields,
              footer: { text: "일요일 오후 8시 기준 자동 집계" },
            },
          ],
        },
      });
    }

    console.log("주간 모니터링 보고 완료");
    return memberStatus;
  } catch (error) {
    console.error("모니터링 프로세스 중 에러:", error.message);
    core.setFailed(error.message);
  }
};
