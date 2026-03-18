import { sendDiscord } from "../utils/discord.js";

export default async ({ github, context, core, data = {} }) => {
  try {
    const incompleteList = data.incompleteTable;
    const mention = data.alertMention;

    const discordPayload = {
      content: `마감 1시간 전! 아직 PR, 리뷰 안 하신 분들 체크해주세요.\n${mention}`,
      allowed_mentions: {
        parse: ["everyone", "users"],
      },
      embeds: [
        {
          title: "LAST CALL\n━━━━━━━━━━━━━━━━━━━━━━",
          description: "아직 PR, 리뷰 못했다면 지금이 타이밍이에요!",
          color: 15606862,
          fields: [
            {
              name: "\u200B",
              value: incompleteList,
              inline: false,
            },
          ],
          footer: { text: "일요일 오후 7시 기준 자동 집계" },
        },
      ],
    };

    await sendDiscord({
      channelId: process.env.DISCORD_CHANNEL_ID,
      botToken: process.env.BOT_TOKEN,
      payload: discordPayload,
    });

    console.log("디스코드 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
