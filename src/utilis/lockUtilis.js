export const MAX_DAILY_AI_REQUESTS = 50;

export const getTodayLogs = (logs) => {
  const today = new Date().toDateString();
  return logs.filter(
    (log) => new Date(log.timestamp).toDateString() === today
  );
};

export const isLocked = (logs) => {
  return getTodayLogs(logs).length >= MAX_DAILY_AI_REQUESTS;
};

export const getRemainingRequests = (logs) => {
  const used = getTodayLogs(logs).length;
  return Math.max(0, MAX_DAILY_AI_REQUESTS - used);
};

export const getConsecutiveQuestsCompleted = () => {
  return Number(localStorage.getItem("consecutiveQuests")) || 0;
};

export const addConsecutiveQuest = () => {
  const current = getConsecutiveQuestsCompleted();
  const updated = current + 1;
  localStorage.setItem("consecutiveQuests", updated);
  return updated;
};

export const resetConsecutiveQuests = () => {
  localStorage.setItem("consecutiveQuests", 0);
};

export const canUnlock = () => {
  return getConsecutiveQuestsCompleted() >= 4;
};