export default async ({ github, context, core }) => {
  try {
    const discussion = context.payload.discussion;
    const title = discussion?.title || "Title";
    const user = discussion?.user?.login || "User";
    const url = discussion?.html_url || "https://github.com";
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
              value: discussion?.category?.name || "General",
              inline: true,
            },
          ],
        },
      ],
    };

    const res = await fetch(
      `https://discord.com/api/v10/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
        body: JSON.stringify(discordPayload),
      },
    );

    if (!res.ok) throw new Error(`Discord API error: ${res.status}`);
    console.log("디스코드 Discussion 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
