import { sendDiscord } from "./utils/discord.js";

export default async ({ github, context, core, data = {} }) => {
  try {
    const incompleteList = data.incompleteTable;

    const discordPayload = {
      content: "이번주 미제출 인원",
      embeds: [
        {
          title: "MISSING SUBMISSIONS\n━━━━━━━━━━━━━━━━━━━━━━",
          description:
            "이번 주 활동 집계가 끝났습니다.\n아래 분들은 다음 주에 더 힘내봐요!",
          color: 15606862,
          fields: [
            {
              name: "\u200B",
              value: incompleteList,
              inline: false,
            },
          ],
          footer: { text: "일요일 오후 8시 기준 자동 집계" },
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
