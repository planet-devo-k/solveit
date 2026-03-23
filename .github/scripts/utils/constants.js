export const MEMBERS = [
  {
    name: "송시은",
    githubId: "sgoldenbird",
    discordId: "1235595153142710372",
  },
  {
    name: "손수진",
    githubId: "pappaya109",
    discordId: "347010234562379786",
  },
  {
    name: "전유진",
    githubId: "yuj2n",
    discordId: "392655134116806676",
  },
  {
    name: "조인성",
    githubId: "Insung-Jo",
    discordId: "1337108063793975328",
  },
  {
    name: "문혜란",
    githubId: "gpfksdlrn",
    discordId: "395167554185854977",
  },
];

export const STUDY_CONFIG = {
  RULES: {
    WEEKS_PER_SESSION: 10,
    MIN_REVIEWS_REQUIRED: 2,
  },
  URL: {
    PROGRAMMERS_BASE:
      "https://school.programmers.co.kr/learn/courses/30/lessons",
  },
};

export const GITHUB_CONFIG = {
  PROJECT_FIELD_STATUS: {
    TODO: "f75ad846",
    IN_PROGRESS: "47fc9ee4",
    DONE: "98236657",
  },
};

export const DISCORD_CONFIG = {
  ROLE: {
    MEMBER_ID: "1483764477827485747",
  },
};

export const BOT_CONFIG = {
  TARGET_CHANNEL_ID: "1481651506372673536",
  MAX_WARNINGS: 5,
  TIMEOUT: {
    MODAL_MS: 5 * 60 * 1000,
    KICK_DELAY_MS: 60 * 1000,
  },
  COLORS: {
    WARNING: "#FFFF00",
    KICK: "#FF0000",
  },
};
