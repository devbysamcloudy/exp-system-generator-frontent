import React from "react";

function SideBar({ onSelectSection, activeSection, userdata, isOpen, onClose }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "xp", label: "XP Progress", icon: "⭐" },
    { id: "quests", label: "Daily Quests", icon: "📋" },
    { id: "skillTracks", label: "Skill Tracks", icon: "🎯" },
    { id: "aiMonitoring", label: "AI Monitoring", icon: "🤖" },
    { id: "reports", label: "Reports", icon: "📊" },
    { id: "auditLogs", label: "Audit Logs", icon: "📜" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const xp = Number(localStorage.getItem("xp")) || 0;
  const level = Math.floor(xp / 100) + 1;
  const profilePic = localStorage.getItem("profilePic");
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userName = userdata?.name || storedUser.firstName || "User";

  const handleClick = (itemId) => {
    if (onSelectSection) onSelectSection(itemId);
    if (onClose) onClose();
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      />
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3>MENU</h3>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={activeSection === item.id ? "active" : ""}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </li>
          ))}
        </ul>
        <div className="sidebar-profile">
          <img
            src={profilePic || "https://www.gravatar.com/avatar/?d=mp"}
            alt="Profile"
            className="sidebar-avatar"
          />
          <div className="sidebar-user-info">
            <span className="sidebar-username">{userName}</span>
            <span className="sidebar-level">Level {level}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;