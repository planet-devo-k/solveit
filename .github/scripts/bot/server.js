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
  MessageFlags,
} from "discord.js";
import "dotenv/config";
import { loadWarningData, saveWarningData } from "../utils/warning_manager.js";
import { BOT_CONFIG } from "../utils/constants.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const handleKickAndReset = async (guild, targetId, reason) => {
  try {
    const member = guild.members.cache.get(targetId);
    if (!member) return;

    await member.kick(reason);

    const warnings = loadWarningData();
    delete warnings[targetId];
    saveWarningData(warnings);

    console.log(`추방 완료\n대상: ${targetId}, 사유: ${reason}`);
  } catch (error) {
    console.error("추방 처리 중 에러 발생:", error);
  }
};

client.once("clientReady", () => {
  console.log(`${client.user.tag} 서버 관리 봇 가동 시작!`);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (
      interaction.isChatInputCommand() &&
      interaction.commandName === "경고"
    ) {
      await handleCommand(interaction);
    } else if (interaction.isButton()) {
      await handleButton(interaction);
    } else if (interaction.isModalSubmit()) {
      await handleModal(interaction);
    }
  } catch (error) {
    console.error("상호작용 처리 중 전역 에러:", error);
  }
});

const handleCommand = async (interaction) => {
  const targetMember = interaction.options.getMember("유저");
  if (!targetMember) {
    return interaction.reply({
      content: "유저를 찾을 수 없습니다.",
      flags: [MessageFlags.Ephemeral],
    });
  }

  const userId = targetMember.id;
  const warnings = loadWarningData();
  const currentCount = (warnings[userId]?.count || 0) + 1;

  warnings[userId] = {
    count: currentCount,
    message: "",
    isConfirmed: false,
  };
  saveWarningData(warnings);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(
        `warn_check_${userId}_${currentCount}_${interaction.channelId}`,
      )
      .setLabel(`클릭`)
      .setStyle(ButtonStyle.Danger),
  );

  const targetChannel = client.channels.cache.get(BOT_CONFIG.TARGET_CHANNEL_ID);
  const messagePayload = {
    content: `${targetMember} 버튼을 눌러 상세 내용을 확인하세요.`,
    components: [row],
  };

  if (targetChannel) {
    await targetChannel.send(messagePayload);
    await interaction.reply({
      content: `${targetMember.user.tag}에 대한 경고 버튼이 생성되었습니다. (누적 ${currentCount}회)`,
      flags: [MessageFlags.Ephemeral],
    });
  } else {
    await interaction.reply(messagePayload);
  }
};

const handleButton = async (interaction) => {
  const [, , targetId, countStr, adminChannelId] =
    interaction.customId.split("_");
  const count = parseInt(countStr);

  if (interaction.user.id !== targetId) {
    return interaction.reply({
      content: `<@${targetId}>님만 확인 가능합니다.`,
      flags: [MessageFlags.Ephemeral],
    });
  }

  const warnings = loadWarningData();
  const userData = warnings[targetId] || {
    count: 0,
    message: "",
    isConfirmed: false,
  };
  const isMaxWarning = count >= BOT_CONFIG.MAX_WARNINGS;

  const modal = new ModalBuilder()
    .setCustomId(`warn_modal_${targetId}_${count}_${adminChannelId}`)
    .setTitle(
      isMaxWarning ? "🚨 추방 (경고 5회 누적)" : `⚠️ 경고 (${count}회차)`,
    );

  const detailInput = new TextInputBuilder()
    .setCustomId("warn_reason")
    .setLabel(
      isMaxWarning
        ? "🚫 추방 조치 안내 (입력 제한시간 5분)"
        : "⚠️ 스터디 룰 위반에 따른 경고 안내",
    )
    .setStyle(TextInputStyle.Paragraph)
    .setValue(userData.message || "")
    .setPlaceholder(
      userData.isConfirmed
        ? "이미 보고가 완료되었습니다."
        : isMaxWarning
          ? "소명 사유가 있다면 입력하고 제출해 주세요.\n미입력시 확인했음으로 간주합니다.\n추후 재가입이 가능합니다."
          : '"확인했습니다" 또는 소명 사유를 입력하고 제출해 주세요.',
    )
    .setRequired(!isMaxWarning && !userData.isConfirmed);

  modal.addComponents([new ActionRowBuilder().addComponents(detailInput)]);
  await interaction.showModal(modal);

  if (isMaxWarning && !userData.isConfirmed) {
    setTimeout(() => {
      const currentWarnings = loadWarningData();
      if (currentWarnings[targetId] && !currentWarnings[targetId].isConfirmed) {
        handleKickAndReset(
          interaction.guild,
          targetId,
          "경고 누적 5회 자동 추방 (소명 미제출 5분 경과)",
        );
      }
    }, BOT_CONFIG.TIMEOUT.MODAL_MS);
  }
};

const handleModal = async (interaction) => {
  const [, , targetId, countStr, adminChannelId] =
    interaction.customId.split("_");
  const count = parseInt(countStr);
  const isMaxWarning = count >= BOT_CONFIG.MAX_WARNINGS;

  const warnings = loadWarningData();
  if (warnings[targetId]?.isConfirmed) {
    return interaction.reply({
      content: "이미 보고가 완료되었습니다.",
      flags: [MessageFlags.Ephemeral],
    });
  }

  const userMessage = interaction.fields.getTextInputValue("warn_reason");

  if (warnings[targetId]) {
    warnings[targetId].message = userMessage;
    warnings[targetId].isConfirmed = true;
    saveWarningData(warnings);
  }

  const adminChannel = client.channels.cache.get(adminChannelId);
  if (adminChannel) {
    const reportEmbed = new EmbedBuilder()
      .setColor(
        isMaxWarning ? BOT_CONFIG.COLORS.KICK : BOT_CONFIG.COLORS.WARNING,
      )
      .setTitle(isMaxWarning ? "최종 경고 및 추방 보고" : "경고 확인 보고")
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .addFields(
        {
          name: "\u200b",
          value: `${interaction.member.displayName} (<@${targetId}>)`,
          inline: true,
        },
        { name: "\u200b", value: `${count}회차`, inline: true },
        { name: "\u200b", value: `\`\`\`${userMessage || "내용 없음"}\`\`\`` },
      );

    await adminChannel.send({ embeds: [reportEmbed] });
  }

  await interaction.reply({
    content: isMaxWarning
      ? "확인 보고가 전달되었습니다. 1분 뒤 추방 조치 됩니다. 추후 다시 재가입 가능합니다.\n소명 사유는 검토 후 참작 시 DM으로 안내 드리겠습니다."
      : "확인 보고가 전달되었습니다. 원활한 스터디를 위해 적극적인 참여 부탁드려요!",
    flags: [MessageFlags.Ephemeral],
  });

  if (isMaxWarning) {
    setTimeout(() => {
      handleKickAndReset(
        interaction.guild,
        targetId,
        "경고 5회 누적 및 소명 제출 (1분 대기 후 추방)",
      );
    }, BOT_CONFIG.TIMEOUT.KICK_DELAY_MS);
  }
};

client.login(process.env.BOT_TOKEN_ALERT);
