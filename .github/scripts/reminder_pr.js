export default async ({ github, context, core }) => {
  try {
    const discordPayload = {
      content: "잊지 말고 PR 생성하고 코드 리뷰 하자!",
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
    console.log("리마인더 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
