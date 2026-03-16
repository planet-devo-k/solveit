import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { formatDateKST } from "./utils/date.js";
import { getThisWeekPullRequests } from "./utils/github.js";
import { sendDiscord } from "./utils/discord.js";
import sessionData from "../data/session/session_6.json" with { type: "json" };
import { createDiscordTable, createMarkdownTable } from "./utils/formatter.js";
import { getDiscussionCategory, createDiscussion } from "./utils/github.js";

export default async ({ github, context, core }) => {
  const { PROJECT_ID, WEEKS_PER_SESSION, MIN_REVIEWS_REQUIRED } = STUDY_CONFIG;

  try {
    const nowStr = formatDateKST(new Date()).replace(/\./g, "-");
    const currentWeekInfo = sessionData.challenges.find(
      (c) => nowStr >= c.date.start && nowStr <= c.date.end,
    );

    if (!currentWeekInfo) {
      console.log(`(${nowStr})는 현재 스터디 진행 기간이 아닙니다.`);
      return;
    }

    const monday = new Date(currentWeekInfo.date.start);
    const sunday = new Date(currentWeekInfo.date.end);
    const prDeadline = new Date(sunday.getTime());
    const reviewDeadline = new Date(sunday.getTime() + 20 * 60 * 60 * 1000);

    console.log(`${currentWeekInfo.week}주차 모니터링 시작`);
    console.log(`- PR 마감: ${formatDateKST(prDeadline)} 00:00`);
    console.log(`- 리뷰 마감: ${formatDateKST(reviewDeadline)} 20:00`);

    console.log("DEBUG 1: PR 목록 가져오기 시도");
    const thisWeekPRs = await getThisWeekPullRequests({
      github,
      context,
      thisMonday: monday,
      thisSaturday: prDeadline,
    });
    console.log(`DEBUG 2: PR 개수 = ${thisWeekPRs.length}`);

    const memberStatus = {};
    const memberIds = Object.keys(MEMBERS);
    memberIds.forEach((id) => {
      memberStatus[id] = {
        name: MEMBERS[id],
        submitted: false,
        prUrl: "",
        reviewPrCount: 0,
        hasMetReviewQuota: false,
      };
    });

    console.log("DEBUG 3: PR 및 리뷰 분석 루프 시작");
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

    memberIds.forEach((id) => {
      const status = memberStatus[id];
      if (status.reviewPrCount >= MIN_REVIEWS_REQUIRED) {
        status.hasMetReviewQuota = true;
      }
    });

    console.log("DEBUG 4: 테이블 생성 및 디스코드 전송 시도");
    const getTableConfig = (includeAbsence = false) => {
      const headers = ["이름", "PR 제출", "리뷰"];
      const paddings = [6, 9, 6];

      if (includeAbsence) {
        headers.push("출석");
        paddings.push(6);
      }

      return {
        headers,
        paddings,
        renderRow: (id) => {
          const s = memberStatus[id];
          const prStatus = s.submitted ? "✅" : "❌";
          const reviewStatus = `${s.reviewPrCount}/${MIN_REVIEWS_REQUIRED}`;

          const rowData = { name: s.name || id, prStatus, reviewStatus };

          if (includeAbsence) {
            rowData.absence = "✅";
          }

          return rowData;
        },
      };
    };

    const incompleteMembers = memberIds.filter((id) => {
      const s = memberStatus[id];
      return !(s.submitted && s.hasMetReviewQuota);
    });

    if (incompleteMembers.length > 0) {
      console.log(
        `DEBUG 5: 미완료자 ${incompleteMembers.length}명 발견. 디스코드 전송 중...`,
      );
      await sendDiscord({
        channelId: process.env.DISCORD_CHANNEL_ID,
        botToken: process.env.BOT_TOKEN,
        payload: {
          content: "주간 스터디 마감 현황",
          embeds: [
            {
              title: "MISSING SUBMISSIONS\n━━━━━━━━━━━━━━━━━━━━━━",
              description:
                "이번 주 활동 집계가 끝났습니다.\n아래 분들은 다음 주에 더 힘내봐요!",
              color: 15606862,
              fields: [
                {
                  name: "\u200B",
                  value: createDiscordTable(
                    incompleteMembers,
                    getTableConfig(false),
                  ),
                  inline: false,
                },
              ],
              footer: { text: "일요일 오후 8시 기준 자동 집계" },
            },
          ],
        },
      });
    }

    console.log("DEBUG 7: 디스커션 작성 시도");
    const allTable = createMarkdownTable(memberIds, getTableConfig(true));
    const discussionTitle = `\`Week${currentWeekInfo.week}\` 스터디 활동 리포트`;
    const discussionBody = `THIS WEEK REPORT\n\n${allTable}\n\n집계 시각: ${formatDateKST(new Date())} 20:00 (KST)`;

    const repository = await getDiscussionCategory({ github, context });
    const categories = repository?.discussionCategories?.nodes || [];
    const reportCategory = categories.find((cat) =>
      cat.name.toUpperCase().includes("REPORT"),
    );

    if (reportCategory) {
      await createDiscussion({
        github,
        repoId: repository.id,
        categoryId: reportCategory.id,
        title: discussionTitle,
        body: discussionBody,
      });
    }

    console.log("주간 모니터링 보고 완료");
    return memberStatus;
  } catch (error) {
    console.error("모니터링 프로세스 중 에러:", error.message);
    core.setFailed(error.message);
  }
};
