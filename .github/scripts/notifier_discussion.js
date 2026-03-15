export default async ({ github, context, core }) => {
  const { sendDiscord } = await import("./utils/discord.js");

  try {
    const discussion = context.payload.discussion;
    const title = discussion?.title || "Title";
    const user = discussion?.user?.login || "User";
    const url =
      discussion?.html_url ||
      "https://github.com/planet-devo-k/solveit/discussions";
    const category = discussion?.category?.name || "General";

    const discordPayload = {
      content: "새로운 게시물이 올라왔어요. 함께 확인해봐요.",
      embeds: [
        {
          title: "NEW Discussion\n━━━━━━━━━━━━━━━━━━━━━━",
          description: `[${title}](${url})`,
          color: 5815039,
          fields: [
            {
              name: "작성자",
              value: user,
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
