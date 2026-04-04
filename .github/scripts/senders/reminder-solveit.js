import { DISCORD_CONFIG } from "../utils/constants.js";
import { sendDiscord } from "../utils/discord.js";
import { getLatestSessionData } from "../utils/session.js";
import { getKSTDateString } from "../utils/date.js";

export default async ({ github, context, core, test }) => {
  try {
    const sessionData = getLatestSessionData();
    const todayStr = getKSTDateString(new Date());

    if (test) {
      console.log("[테스트 모드] 날짜 체크를 건너뜁니다.");
    } else if (sessionData.date.start !== todayStr) {
      console.log(
        `(${todayStr})는 세션 시작일(${sessionData.date.start})이 아닙니다. 알림을 생략합니다.`,
      );
      return;
    }

    console.log(`세션 ${sessionData.id} 시작 리마인더 전송`);

    const mention = `<@&${DISCORD_CONFIG.ROLE.MEMBER_ID}>`;

    const discordPayload = {
      content: `${mention} 새로운 세션이 시작됐어요! 이따 만나요!`,
      allowed_mentions: {
        parse: ["everyone", "roles", "users"],
      },
      embeds: [
        {
          title: "오늘 Solveit 모임 있는 날\n━━━━━━━━━━━━━━━━━━━━━━",
          color: 16374876,
          fields: [
            {
              name: "When",
              value: `${sessionData.date.start} 월요일 오후 10시`,
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

    console.log("세션 시작 스터디 모임 리마인더 알림 전송 완료");
  } catch (error) {
    console.error("알림 전송 실패:", error.message);
    core.setFailed(error.message);
  }
};
