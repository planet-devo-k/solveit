export default async ({ github, context, core }) => {
  try {
    const discordPayload = {
      content: "함께 배우며 성장하는 시간, 이따 만나요!",
      embeds: [
        {
          title: "오늘 스터디 있는 날\n━━━━━━━━━━━━━━━━━━━━━━",
          color: 16374876,
          fields: [
            {
              name: "When",
              value: "✓ 매주 일요일 오후 10시",
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
          Authorization: `Bot ${process.env.REMINDER_BOT_TOKEN}`,
        },
        body: JSON.stringify(discordPayload),
      },
    );

    if (!res.ok) throw new Error(`Discord API error: ${res.status}`);
    console.log("스터디 모임 리마인더 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
