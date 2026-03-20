import React, { useState } from "react";
import {
  getSkillTracks,
  getLevel,
  getProgressPercentage,
  SKILL_TRACKS,
} from "../utilis/xpSystem";

const LANGUAGE_COLORS = {
  HTML: "#e34c26",
  CSS: "#264de4",
  JavaScript: "#f0db4f",
  Python: "#3572A5",
  React: "#61dafb",
  Flutter: "#54c5f8",
};

function SkillTracks() {
  const [tracks] = useState(() => getSkillTracks());

  return (
    <div className="skill-tracks">
      <h3>Skill Tracks</h3>
      <div className="skill-tracks-grid">
        {SKILL_TRACKS.map((lang) => {
          const xp = tracks[lang] || 0;
          const level = getLevel(xp);
          const progress = getProgressPercentage(xp);
          const color = LANGUAGE_COLORS[lang] || "#4f46e5";

          return (
            <div key={lang} className="skill-card">
              <div className="skill-card-header">
                <span className="skill-name">{lang}</span>
                <span className="skill-level">Level {level}</span>
              </div>
              <div className="skill-progress-container">
                <div
                  className="skill-progress-bar"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <div className="skill-xp">
                <small>{xp} XP</small>
                <small>{Math.round(progress)}%</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillTracks;