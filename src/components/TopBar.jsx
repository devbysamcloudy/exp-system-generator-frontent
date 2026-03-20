import React from "react";
import NotificationBell from "./NotificationBell";

function TopBar({ userName = "User", toggleTheme, darkMode, remainingRequests, onMenuToggle }) {
  const xp = Number(localStorage.getItem("xp")) || 0;
  const level = Math.floor(xp / 100) + 1;
  const nextLevelXP = level * 100;

  return (
    <div className="topbar">
      <div className="topbar-left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button className="hamburger-btn" onClick={onMenuToggle}>☰</button>
        <h2>Exp System Dashboard</h2>
      </div>
      <div className="topbar-right">
        <div className="topbar-xp">
          <span className="xp-label">XP: {xp.toLocaleString()}</span>
          <span className="xp-next">/ {nextLevelXP.toLocaleString()}</span>
          <span className="xp-level">Lvl {level}</span>
        </div>
        <span className={`request-counter ${remainingRequests <= 5 ? "warning" : ""}`}>
          🤖 {remainingRequests} AI left
        </span>
        <span className="topbar-user">Hello, {userName}</span>
        <NotificationBell />
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}

export default TopBar;