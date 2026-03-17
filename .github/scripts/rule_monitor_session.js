import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { formatDateKST, formatDateString } from "./utils/date.js";
import sessionData from "../data/session/session_6.json" with { type: "json" };
import { createMarkdownTable } from "./utils/formatter.js";
import {
  getDiscussionCategory,
  createDiscussion,
  getRepoLabels,
  findLabelIdByName,
} from "./utils/github.js";

export default async ({ github, context, core }) => {
  const { MIN_REVIEWS_REQUIRED } = STUDY_CONFIG;

  try {
    const nowStrDots = formatDateKST(new Date());
    const sessionEndDots = formatDateString(sessionData.date.end);

    if (
      nowStrDots !== sessionEndDots &&
      context.eventName !== "workflow_dispatch"
    ) {
      console.log(
        `오늘은 세션 종료일(${sessionEndDots})이 아닙니다. 현재 날짜: ${nowStrDots}`,
      );
      console.log("세션 종합 리포트 생성을 스킵합니다.");
      return;
    }

    const sessionStart = new Date(sessionData.date.start);
    const sessionEnd = new Date(sessionData.date.end);

    console.log(
      `오늘은 세션${sessionData.id} 종료일(${sessionData.date.start} ~ ${sessionData.date.end}): 세션 ${sessionData.id} 종합 리포트 작성을 시작합니다.`,
    );

    const repository = await getDiscussionCategory({ github, context });
    const categories = repository?.discussionCategories?.nodes || [];
    const reportCategory = categories.find((cat) =>
      cat.name.toUpperCase().includes("REPORT"),
    );

    const recentDiscussionsQuery = `
      query($repoId: ID!, $categoryId: ID!) {
        node(id: $repoId) {
          ... on Repository {
            discussions(first: 10, categoryId: $categoryId, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                title
                body
              }
            }
          }
        }
      }
    `;
    const discRes = await github.graphql(recentDiscussionsQuery, {
      repoId: repository.id,
      categoryId: reportCategory.id,
    });
    const reportDiscussions = discRes.node.discussions.nodes;

    const allPRs = await github.paginate(github.rest.pulls.list, {
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: "all",
      per_page: 100,
    });

    console.log(`DEBUG 2: 총 ${allPRs.length}개의 PR을 발견했습니다.`);

    const sessionPRs = allPRs.filter((pr) => {
      const createdAt = new Date(pr.created_at);
      return createdAt >= sessionStart && createdAt <= sessionEnd;
    });

    console.log(`DEBUG 3: 세션 기간 내 PR 개수 = ${sessionPRs.length}`);

    const reportData = {};
    const memberIds = Object.keys(MEMBERS);
    const weeks = sessionData.challenges.map((c) => c.week);

    memberIds.forEach((id) => {
      reportData[id] = {
        name: MEMBERS[id],
        weeks: {},
        totalPRs: 0,
        totalReviews: 0,
        attendanceCount: 0,
      };
      weeks.forEach((w) => {
        reportData[id].weeks[w] = { pr: false, reviews: 0, isAbsent: true };
      });
    });

    weeks.forEach((w) => {
      const weekReport = reportDiscussions.find((d) =>
        d.title.includes(`Week ${w}`),
      );
      memberIds.forEach((id) => {
        const memberName = MEMBERS[id];
        if (weekReport && weekReport.body.includes(`${memberName} | ✅`)) {
          reportData[id].weeks[w].isAbsent = false;
          reportData[id].attendanceCount++;
        }
      });
    });

    for (const pr of sessionPRs) {
      const author = pr.user.login;
      const createdAt = new Date(pr.created_at);

      const weekInfo = sessionData.challenges.find((c) => {
        const start = new Date(c.date.start);
        const end = new Date(c.date.end);
        return createdAt >= start && createdAt <= end;
      });

      if (!weekInfo || !reportData[author]) continue;

      const weekNum = weekInfo.week;
      reportData[author].weeks[weekNum].pr = true;
      reportData[author].totalPRs++;

      const { data: reviews } = await github.rest.pulls.listReviews({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: pr.number,
      });

      const uniqueReviewers = new Set(reviews.map((r) => r.user.login));
      uniqueReviewers.forEach((reviewerId) => {
        if (reportData[reviewerId] && reviewerId !== author) {
          reportData[reviewerId].weeks[weekNum].reviews++;
          reportData[reviewerId].totalReviews++;
        }
      });
    }

    const tableConfig = {
      headers: ["이름", ...weeks.map((w) => `W${w}`), "총합"],
      paddings: [6, ...weeks.map(() => 15), 10],
      renderRow: (id) => {
        const s = reportData[id];
        const row = { name: s.name };
        let currentAttendance = 0;

        weeks.forEach((w) => {
          const wData = s.weeks[w];
          const hasPR = wData.pr;
          const hasRev = wData.reviews >= MIN_REVIEWS_REQUIRED;
          const isAbsent = wData.isAbsent;
          const isSuccess = hasPR && hasRev && !isAbsent;

          if (isSuccess) {
            row[`week${w}`] = "✅";
            currentAttendance++;
          } else {
            const reasons = [];
            if (!hasPR && wData.reviews === 0) {
              reasons.push("결석");
            } else {
              if (!hasPR) reasons.push("PR");
              if (!hasRev)
                reasons.push(`리뷰${wData.reviews}/${MIN_REVIEWS_REQUIRED}`);
            }
            if (isAbsent) reasons.push("결석");

            const reasonText =
              reasons.length > 0 ? `(${reasons.join(",")})` : "";
            row[`week${w}`] = `❌${reasonText}`;
          }
        });

        row.total = `${s.totalPRs}PR / ${s.totalReviews}Rev / ${s.attendanceCount}출석`;
        return row;
      },
    };

    const finalTable = createMarkdownTable(memberIds, tableConfig);
    const discussionTitle = `\`Session${sessionData.id}\` 세션 종합 활동 리포트`;
    const discussionBody = `## THIS SESSION REPORT\n\n${finalTable}\n\n집계 시각: ${formatDateKST(new Date())}(KST)\n\n수고하셨습니다!`;

    const labels = await getRepoLabels({ github, context });
    const reportLabelId = findLabelIdByName(labels, "report");

    if (reportCategory) {
      const discussion = await createDiscussion({
        github,
        repoId: repository.id,
        categoryId: reportCategory.id,
        title: discussionTitle,
        body: discussionBody,
        labelIds: reportLabelId,
      });

      console.log(`Session 리포트 생성 완료: ${discussion.id}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};
