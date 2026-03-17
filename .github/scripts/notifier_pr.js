import { sendDiscord } from "./utils/discord.js";
// import { waitForReviewers } from "./utils/github.js";

export default async ({ github, context, core }) => {
  try {
    // 리뷰어 배정 대기 및 PR 데이터 획득
    // const pr = await waitForReviewers({
    //   github,
    //   context,
    //   pullNumber: context.issue.number,
    // });

    // const reviewers =
    //   pr.requested_reviewers?.map((r) => `@${r.login}`).join(", ") ||
    //   "리뷰어 지정 중...";
    const pr = context.payload.pull_request;
    const reviewers = process.env.ASSIGNED_REVIEWERS || "리뷰어 지정 중...";

    const discordPayload = {
      content: "새로운 PR이 생성되었습니다. 코드 리뷰가 기다리고 있어요.",
      embeds: [
        {
          title: "NEW PR\n━━━━━━━━━━━━━━━━━━━━━━",
          description: `[${pr.title}](${pr.html_url})`,
          color: 5815039,
          fields: [
            { name: "작성자", value: pr.user.login, inline: true },
            {
              name: "리뷰어",
              value: reviewers,
              inline: true,
            },
          ],
        },
      ],
    };

    await sendDiscord({
      channelId: process.env.DISCORD_CHANNEL_ID,
      botToken: process.env.BOT_TOKEN,
      payload: discordPayload,
    });

    console.log("디스코드 PR 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
