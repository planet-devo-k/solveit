import { sendDiscord } from "./utils/discord.js";

export default async ({ github, context, core, discussion }) => {
  try {
    const target = discussion || context.payload.discussion;
    const title = target?.title || (discussion ? "Bot" : "User");
    const author = target?.user?.login || "User";
    const url =
      target?.html_url ||
      target?.url ||
      "https://github.com/planet-devo-k/solveit/discussions";
    const category = target?.category?.name || "General";
    const isReport = category.toLowerCase().includes("report") || !!discussion;

    const discordPayload = {
      content: isReport
        ? "스터디 리포트가 발행되었습니다."
        : "새로운 게시물이 올라왔어요. 함께 확인해봐요.",
      embeds: [
        {
          title: `${isReport ? "NEW REPORT" : "NEW POST"}\n━━━━━━━━━━━━━━━━━━━━━━`,
          description: `[${title}](${url})`,
          color: isReport ? 16777215 : 5815039,
          fields: [
            {
              name: "작성자",
              value: author,
              inline: true,
            },
            {
              name: "카테고리",
              value: category,
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

    console.log("디스코드 Discussion 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
