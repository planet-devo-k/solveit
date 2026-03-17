import { sendDiscord } from "./utils/discord.js";

export default async ({ github, context, core, data }) => {
  try {
    if (!data.alert) return;

    const payload = {
      content: data.alert.content || "ALERT",
      embeds: [
        {
          title: `${data.alert.title || "ALERT"}\n━━━━━━━━━━━━━━━━━━━━━━`,
          description: data.alert.description || "",
          color: data.alert.color || 15606862,
          fields: data.alert.fields || [],
          footer: { text: data.alert.footer || "Automation" },
        },
      ],
    };

    await sendDiscord({
      channelId: process.env.DISCORD_CHANNEL_ID,
      botToken: process.env.BOT_TOKEN,
      payload: payload,
    });

    console.log("디스코드 Alert 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
