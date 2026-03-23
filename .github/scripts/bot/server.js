import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  InteractionType,
} from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "../../data/warnings.json");

const TARGET_CHANNEL_ID = "1481651506372673536";

const getWarnings = () => {
  try {
    if (!fs.existsSync(DB_PATH)) return {};
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return {};
  }
};

const saveWarnings = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("데이터 저장 실패:", error);
  }
};

client.once("clientReady", () => {
  console.log(`${client.user.tag} 서버 관리 봇 가동 시작!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // 명령어 인식 로직
  if (message.content.startsWith("!경고")) {
    const member = message.mentions.members.first();
    if (!member) return;

    const warnings = getWarnings();
    const userId = member.id;
    warnings[userId] = (warnings[userId] || 0) + 1;
    const currentCount = warnings[userId];

    saveWarnings(warnings);

    const targetChannel = client.channels.cache.get(TARGET_CHANNEL_ID);

    if (currentCount >= 3) {
      const kickEmbed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("🚫 누적 경고 3회: 추방 조치")
        .setDescription(
          `${member}님, 지속적인 무반응 및 규칙 미준수로 인해 경고가 3회 누적되었습니다.\n커뮤니티 운영 원칙에 따라 서버에서 추방(Kick) 처리됩니다.`,
        )
        .addFields({
          name: "재가입 및 소명 안내",
          value:
            "> 본 조치는 영구 제명(Ban)이 아니므로 공식 가입 절차를 통해 재가입하실 수 있습니다.\n> 본 조치와 관련하여 소명할 사유(피치못할 사정 등)가 있으신 경우, 운영진에게 DM을 통해 문의해 주시기 바랍니다.\n> 단, 재가입 시에는 이전보다 더욱 적극적인 상호작용이 요구됨을 유의해 주세요.",
        });

      if (targetChannel) {
        await targetChannel.send({ embeds: [kickEmbed] });
      } else {
        await message.channel.send({ embeds: [kickEmbed] });
      }

      try {
        await member.kick("경고 3회 누적 자동 추방");
        delete warnings[userId];
        saveWarnings(warnings);
      } catch (err) {
        console.error("추방 권한이 없거나 오류가 발생했습니다.", err);
      }
    } else {
      const embed = new EmbedBuilder()
        .setColor("#FFFF00")
        .setTitle(`⚠️ 경고 (${currentCount}회차)`)
        .setDescription(
          `${member}님,\n스터디 상호작용 관련 공지드린 룰에 따라 경고를 드립니다.`,
        )
        .addFields({
          name: "",
          value:
            "> 원활한 스터디 분위기를 위해 조금 더 적극적인 리액션과 피드백을 부탁드릴게요!\n> 질문이나 어려운 점이 있으시면 문의하세요.",
        })
        .setFooter({
          text: "침묵은 오해를, 반응은 신뢰를 만듭니다.",
        });

      if (targetChannel) {
        await targetChannel.send({ embeds: [embed] });
      } else {
        await message.channel.send({ embeds: [embed] });
      }
    }
    await message.delete().catch(() => {});
  }
});

client.login(process.env.BOT_TOKEN_ALERT);
