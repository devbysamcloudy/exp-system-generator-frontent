export const addNotification = (message) => {
  const existing = JSON.parse(localStorage.getItem("notifications")) || [];
  const newNotification = {
    id: Date.now(),
    message,
    time: "Just now",
    read: false,
  };
  const updated = [newNotification, ...existing];
  localStorage.setItem("notifications", JSON.stringify(updated));
};

export const NOTIFICATION_EVENTS = {
  questComplete: (questTitle, xp) =>
    `✅ Quest complete: "${questTitle}" — +${xp} XP earned!`,
  levelUp: (level) =>
    `🎉 You leveled up to Level ${level}!`,
  locked: () =>
    `🔒 AI access locked — complete 4 quests to unlock.`,
  unlocked: () =>
    `🔓 AI access unlocked! You're good to go.`,
  skillLevelUp: (language, level) =>
    `⭐ Your ${language} skill reached Level ${level}!`,
  dailyQuestAvailable: () =>
    `🎯 A new daily quest is available!`,
  githubConnected: (username) =>
    `🐙 GitHub connected for ${username}!`,
};