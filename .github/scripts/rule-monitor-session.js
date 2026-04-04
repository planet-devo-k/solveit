import { MEMBERS, STUDY_CONFIG } from "./utils/constants.js";
import { getKSTDateString } from "./utils/date.js";
import { getLatestSessionData } from "./utils/session.js";
import { createMarkdownTable } from "./utils/formatter.js";
import {
  createDiscussion,
  getRepositoryInfo,
  getDiscussionCategories,
  getThisSessionPRs,
  parseWeeksFromTitle,
  addLabelByName,
} from "./utils/github.js";

export default async ({ github, context, core, test }) => {
  const { RULES } = STUDY_CONFIG;
  const { MIN_REVIEWS_REQUIRED } = RULES;

  try {
    const sessionData = getLatestSessionData();
    const nowStr = getKSTDateString(new Date());
    const sessionEnd = getKSTDateString(new Date(sessionData.date.end));

    if (test) {
      console.log("[테스트 모드] 날짜 체크를 건너뜁니다.");
    } else if (nowStr !== sessionEnd) {
      console.warn(
        `오늘은 세션 종료일(${sessionEnd})이 아닙니다. 현재 날짜: ${nowStr}. 세션 리포트 생성을 스킵합니다.`,
      );
      return;
    }

    console.log(
      `세션 ${sessionData.id} 리포트 작성 시작 (${sessionData.date.start} ~ ${sessionData.date.end})`,
    );

    const weeks = sessionData.challenges.map((c) => c.week);
    const firstWeek = weeks[0];

    // ─── 출석 정보 (세션 레벨 absentees) ───
    const absenteeMap = {};
    (sessionData.absentees || []).forEach((a) => {
      if (a.name) {
        absenteeMap[a.name] = a.status;
      }
    });

    // ─── 멤버 데이터 초기화 ───
    const reportData = {};
    MEMBERS.forEach((member) => {
      reportData[member.githubId] = {
        name: member.name,
        discordId: member.discordId,
        weeks: {},
        totalPRs: 0,
        totalReviews: 0,
      };

      weeks.forEach((w) => {
        reportData[member.githubId].weeks[w] = {
          pr: false,
          prUrl: "",
          reviews: 0,
        };
      });
    });

    // ─── PR + 리뷰 집계 ───
    const sessionPRs = await getThisSessionPRs({
      github,
      context,
      weeks: sessionData.weeks,
    });
    console.log(`세션 기간 내 PR 개수 = ${sessionPRs.length}`);

    await Promise.all(
      sessionPRs.map(async (pr) => {
        const author = pr.user.login;
        const prWeeks = parseWeeksFromTitle(pr.title);
        if (prWeeks.length === 0 || !reportData[author]) return;
        const weekNum = Math.max(...prWeeks);

        reportData[author].weeks[weekNum].pr = true;
        reportData[author].weeks[weekNum].prUrl = pr.html_url;
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
      }),
    );

    // ─── 활동 테이블 (5주씩 분할) ───
    const memberIds = MEMBERS.map((m) => m.githubId);
    const CHUNK_SIZE = 5;
    const weekChunks = [];
    for (let i = 0; i < weeks.length; i += CHUNK_SIZE) {
      weekChunks.push(weeks.slice(i, i + CHUNK_SIZE));
    }

    const activityTables = weekChunks.map((chunk) => {
      const tableConfig = {
        headers: ["이름", ...chunk.map((w) => `W${w}`)],
        paddings: [6, ...chunk.map(() => 20)],
        renderRow: (id) => {
          const s = reportData[id];
          const row = { name: s.name };

          chunk.forEach((w) => {
            const wData = s.weeks[w];
            const parts = [];

            if (w === firstWeek) {
              const absentStatus = absenteeMap[s.name];
              if (absentStatus === "absent") {
                parts.push("❌결석");
              } else if (absentStatus === "late") {
                parts.push("⏰지각");
              } else {
                parts.push("✅출석");
              }
            }

            if (wData.pr) {
              parts.push(`✅[PR](${wData.prUrl})`);
            } else {
              parts.push("❌PR");
            }

            if (wData.reviews >= MIN_REVIEWS_REQUIRED) {
              parts.push(`✅리뷰${wData.reviews}/${MIN_REVIEWS_REQUIRED}`);
            } else {
              parts.push(`❌리뷰${wData.reviews}/${MIN_REVIEWS_REQUIRED}`);
            }

            row[`week${w}`] = parts.join(" ");
          });

          return row;
        },
      };

      return createMarkdownTable(memberIds, tableConfig);
    });

    // ─── 총합 테이블 ───
    const summaryTableConfig = {
      headers: ["이름", "총 PR", "총 리뷰"],
      paddings: [6, 8, 8],
      renderRow: (id) => {
        const s = reportData[id];
        return {
          name: s.name,
          totalPRs: `${s.totalPRs}`,
          totalReviews: `${s.totalReviews}`,
        };
      },
    };

    const summaryTable = createMarkdownTable(memberIds, summaryTableConfig);

    // ─── 리포트 생성 ───
    const reportTitle = `\`Session${sessionData.id}\` 세션 활동 리포트`;
    const reportBody = [
      `## THIS SESSION REPORT`,
      ``,
      `**${sessionData.date.start} ~ ${sessionData.date.end}**`,
      ``,
      ...activityTables.flatMap((table) => [table, ``]),
      `### 총합`,
      ``,
      summaryTable,
      ``,
      `> 집계 시각: ${getKSTDateString(new Date())} 22:00 (KST)`,
      ``,
      `수고하셨습니다!`,
    ].join("\n");

    // ─── GitHub Discussion 생성 ───
    const repository = await getRepositoryInfo({ github, context });
    const categories = await getDiscussionCategories({ github, context });
    const categoryReport = categories.find((cat) =>
      cat.name.toLowerCase().includes("report"),
    );

    if (categoryReport) {
      const thisSessionReport = await createDiscussion({
        github,
        repoId: repository.id,
        categoryId: categoryReport.id,
        title: reportTitle,
        body: reportBody,
      });

      await addLabelByName({
        github,
        context,
        nodeId: thisSessionReport.id,
        labelName: "report",
      });

      console.log(`Session 리포트 생성 완료: ${thisSessionReport.id}`);

      return {
        reportData: {
          title: reportTitle,
          url: `https://github.com/${context.repo.owner}/${context.repo.repo}/discussions/${thisSessionReport.number}`,
        },
      };
    }

    console.warn("report 카테고리를 찾을 수 없습니다.");
    return null;
  } catch (error) {
    console.error("세션 리포트 생성 중 에러 발생:", error.message);
    core.setFailed(error.message);
    throw error;
  }
};
