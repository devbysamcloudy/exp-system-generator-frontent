import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Topbar from "../components/TopBar";
import "./Dashboard.css";
import ProgressBar from "../components/ProgressBar";
import Reports from "../components/Reports";
import AuditLogs from "../components/AuditLogs";
import AppDescription from "../components/AppDescription";
import {
  getLevel,
  getProgressPercentage,
  addXPToStorage,
  addSkillXP,
} from "../utilis/xpSystem";
import { useAuth } from "./Auth/ProtectedRoutes";
import { useLogout } from "../utilis/authUtils";
import AIMonitoring from "../components/AIMonitoring";
import DashboardStats from "../components/DashboardStats";
import GitHubStats from "../components/GitHubStats";
import QuestGenerator from "../components/QuestGenerator";
import { API_URLS } from "../utilis/apiservices";
import SkillTracks from "../components/SkillTracks";
import LockModal from "../components/LockModal";
import DailyQuestCard from "../components/DailyQuestCard";
import { addNotification, NOTIFICATION_EVENTS } from "../utilis/notificationUtils";
import {
  isLocked,
  getTodayLogs,
  getRemainingRequests,
  addConsecutiveQuest,
  resetConsecutiveQuests,
  canUnlock,
} from "../utilis/lockUtilis";

function Dashboard() {
  const { userdata } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [logs, setLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("aiLogs")) || [];
  });
  const [detectedLanguages, setDetectedLanguages] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showLockModal = isLocked(logs) && !isUnlocked;

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const xp = Number(localStorage.getItem("xp")) || 0;
  const level = getLevel(xp);
  const progress = getProgressPercentage(xp);

  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const addXP = (amount) => {
    return addXPToStorage(amount);
  };

  const handleUnlock = () => {
    if (canUnlock()) {
      setIsUnlocked(true);
      resetConsecutiveQuests();
      addNotification(NOTIFICATION_EVENTS.unlocked());
    }
  };

  const handleExit = () => {
    logout();
    navigate("/login");
  };

  const logAction = (feature, success) => {
    if (isLocked(logs) && !isUnlocked) {
      alert("🔒 AI access is locked. Complete 4 quests to unlock.");
      addNotification(NOTIFICATION_EVENTS.locked());
      return;
    }

    const newLog = {
      user: userdata?.name || "User",
      feature,
      success,
      timestamp: new Date().toISOString(),
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem("aiLogs", JSON.stringify(updatedLogs));

    fetch(API_URLS.AILOGS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: newLog.user,
        feature: newLog.feature,
        success: newLog.success,
      }),
    }).catch((err) => console.error("Failed to send log to backend:", err));
  };

  const handleQuestAccepted = (quest) => {
    const reward = quest.xpReward || 50;
    const { leveledUp, newLevel } = addXP(reward);
    const skillResult = addSkillXP(quest.language, reward);

    addNotification(NOTIFICATION_EVENTS.questComplete(quest.description, reward));

    if (leveledUp) {
      addNotification(NOTIFICATION_EVENTS.levelUp(newLevel));
    }
    if (skillResult.leveledUp) {
      addNotification(NOTIFICATION_EVENTS.skillLevelUp(quest.language, skillResult.newLevel));
    }

    addConsecutiveQuest();
    logAction(quest.language, true);
    alert(`Quest accepted! +${reward} XP`);
    window.location.reload();
  };

  const handleDailyQuestComplete = (quest) => {
    const { leveledUp, newLevel } = addXP(quest.reward);
    const skillResult = addSkillXP(quest.language, quest.reward);

    addNotification(NOTIFICATION_EVENTS.questComplete(quest.title, quest.reward));

    if (leveledUp) {
      addNotification(NOTIFICATION_EVENTS.levelUp(newLevel));
    }
    if (skillResult.leveledUp) {
      addNotification(NOTIFICATION_EVENTS.skillLevelUp(quest.language, skillResult.newLevel));
    }

    addConsecutiveQuest();
    logAction(quest.title, true);
    alert(`Quest complete! +${quest.reward} XP`);
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "reports":
        return <Reports logs={logs} darkMode={darkMode} />;
      case "auditLogs":
        return <AuditLogs localLogs={logs} />;  
      case "xp":
        return (
          <div className="xp-page">
            <h2>XP Progress</h2>
            <div className="xp-section">
              <h3>Level {level}</h3>
              <ProgressBar progress={progress} />
              <p>{xp} XP</p>
            </div>
            <SkillTracks />
          </div>
        );
      case "quests":
        return (
          <div className="quests-page">
            <h2>Daily Quests</h2>
            <DailyQuestCard
              darkMode={darkMode}
              onQuestComplete={handleDailyQuestComplete}
            />
            <QuestGenerator
              languages={detectedLanguages}
              onQuestAccepted={handleQuestAccepted}
              darkMode={darkMode}
            />
          </div>
        );
      case "skillTracks":
        return <SkillTracks />;
      case "aiMonitoring":
        return <AIMonitoring logs={logs} />;
      case "settings":
        return (
          <div className="settings-page">
            <h2>Settings</h2>
            <div className="setting-item">
              <label>Dark Mode</label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
              />
            </div>
            <div className="setting-item">
              <label>Reset XP</label>
              <button
                onClick={() => {
                  localStorage.setItem("xp", 0);
                  window.location.reload();
                }}
              >
                Reset
              </button>
            </div>
          </div>
        );
      case "about":
        return <AppDescription darkMode={darkMode} />;
      case "dashboard":
      default:
        return (
          <>
            <div className="xp-section">
              <h3>Level {level}</h3>
              <ProgressBar progress={progress} />
              <p>{xp} XP</p>
            </div>
            <DashboardStats />
            <DailyQuestCard
              darkMode={darkMode}
              onQuestComplete={handleDailyQuestComplete}
            />
            <SkillTracks />
            <GitHubStats onLanguagesDetected={setDetectedLanguages} />
            <QuestGenerator
              languages={detectedLanguages}
              onQuestAccepted={handleQuestAccepted}
              darkMode={darkMode}
            />
            <AIMonitoring logs={logs} />
          </>
        );
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      {showLockModal && (
        <LockModal
          usedRequests={getTodayLogs(logs).length}
          onUnlock={handleUnlock}
          onExit={handleExit}
        />
      )}
      <Topbar
        userName={userdata?.name}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
        remainingRequests={getRemainingRequests(logs)}
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
      />
      <Sidebar
        onSelectSection={setActiveSection}
        activeSection={activeSection}
        darkMode={darkMode}
        userdata={userdata}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-greeting">
            Hello, <span>{userdata?.name}</span>!
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;