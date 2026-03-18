import { sendDiscord } from "../utils/discord.js";

export default async ({ github, context, core }) => {
  try {
    const discordPayload = {
      content: "@everyone 잊지 말고 PR 생성하고 코드 리뷰 하자!",
      allowed_mentions: {
        parse: ["everyone", "users"],
      },
      embeds: [
        {
          title: "PR REMINDER\n━━━━━━━━━━━━━━━━━━━━━━",
          color: 16374876,
          fields: [
            {
              name: "Deadline",
              value: " ✓ PR 토요일 자정 \n ✓ 리뷰 일요일 오후 8시",
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

    console.log("리마인더 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
