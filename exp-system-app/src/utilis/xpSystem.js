export const getLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

export const getXPForNextLevel = (xp) => {
  const level = getLevel(xp);
  return level * 100;
};

export const getProgressPercentage = (xp) => {
  const levelXP = (getLevel(xp) - 1) * 100;
  const nextLevelXP = getXPForNextLevel(xp);
  return ((xp - levelXP) / (nextLevelXP - levelXP)) * 100;
};

export const XP_REWARDS = {
  JavaScript: 60,
  Python: 60,
  Java: 70,
  TypeScript: 70,
  CSS: 40,
  HTML: 40,
  React: 80,
  Flutter: 80,
  default: 50,
};

export const getXPReward = (language) => {
  return XP_REWARDS[language] || XP_REWARDS["default"];
};

export const addXPToStorage = (amount) => {
  const currentXP = Number(localStorage.getItem("xp")) || 0;
  const oldLevel = getLevel(currentXP);
  const newXP = currentXP + amount;
  const newLevel = getLevel(newXP);
  localStorage.setItem("xp", newXP);
  return { newXP, leveledUp: newLevel > oldLevel, newLevel };
};

// Skill Tracks
export const SKILL_TRACKS = [
  "HTML",
  "CSS",
  "JavaScript",
  "Python",
  "React",
  "Flutter",
];

export const getSkillTracks = () => {
  const stored = localStorage.getItem("skillTracks");
  if (stored) return JSON.parse(stored);

  const initial = {};
  SKILL_TRACKS.forEach((lang) => {
    initial[lang] = 0;
  });
  localStorage.setItem("skillTracks", JSON.stringify(initial));
  return initial;
};

export const addSkillXP = (language, amount) => {
  const tracks = getSkillTracks();
  const oldXP = tracks[language] || 0;
  const oldLevel = getLevel(oldXP);

  if (tracks[language] !== undefined) {
    tracks[language] += amount;
  } else {
    tracks[language] = amount;
  }

  const newLevel = getLevel(tracks[language]);
  localStorage.setItem("skillTracks", JSON.stringify(tracks));
  return { tracks, leveledUp: newLevel > oldLevel, newLevel, language };
};