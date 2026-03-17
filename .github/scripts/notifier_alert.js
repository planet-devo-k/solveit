import { sendDiscord } from "./utils/discord.js";

export default async ({ github, context, core, alertData }) => {
  try {
    if (!alertData) return;

    const payload = {
      content: alertData.content || "ALERT",
      embeds: [
        {
          title: `${alertData.title || "ALERT"}\n━━━━━━━━━━━━━━━━━━━━━━`,
          description: alertData.description || "",
          color: alertData.color || 15606862,
          fields: alertData.fields || [],
          footer: { text: alertData.footer || "Automation" },
        },
      ],
    };

    await sendDiscord({
      channelId: process.env.DISCORD_CHANNEL_ID,
      botToken: process.env.BOT_TOKEN,
      payload: payload,
    });

    console.log(`[Alert] ${alertData.title} 알림 전송 완료`);
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
