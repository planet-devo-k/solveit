/**
 * 디스코드 채널로 메시지를 전송합니다.
 */
export const sendDiscord = async ({ channelId, botToken, payload }) => {
  const res = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${botToken}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      `Discord API error: ${res.status} ${JSON.stringify(errorData)}`,
    );
  }
  return res;
};
