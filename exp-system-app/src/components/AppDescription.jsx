import React from "react";
import "./AppDescription.css";

function AppDescription({ darkMode }) {
  return (
    <div className={`app-description ${darkMode ? "dark" : "light"}`}>
      <h2>About Exp-System</h2>

      <section className="description-section">
        <h3>What is Exp-System?</h3>
        <p>
          Exp-System is a gamified learning platform designed to help developers improve
          their coding skills through an engaging XP (Experience Points) system. Track your
          progress, complete daily quests, and level up your programming abilities.
        </p>
      </section>

      <section className="description-section">
        <h3>Key Features</h3>
        <ul>
          <li>
            <strong>Daily Quests:</strong> Complete coding challenges tailored to your
            skill level and earn XP rewards.
          </li>
          <li>
            <strong>Skill Tracks:</strong> Monitor your progress across multiple
            programming languages like JavaScript, Python, React, and more.
          </li>
          <li>
            <strong>XP & Leveling:</strong> Earn experience points for completed quests
            and watch your level grow as you master new skills.
          </li>
          <li>
            <strong>GitHub Integration:</strong> Connect your GitHub account to analyze
            your repositories and get personalized quest recommendations.
          </li>
          <li>
            <strong>AI Monitoring:</strong> Track your AI usage and ensure responsible
            learning practices.
          </li>
          <li>
            <strong>Audit Logs:</strong> Keep a history of your activities and progress
            over time.
          </li>
        </ul>
      </section>

      <section className="description-section">
        <h3>How It Works</h3>
        <ol>
          <li>Sign up or log in to your account</li>
          <li>Connect your GitHub to personalize your learning path</li>
          <li>Complete daily quests to earn XP</li>
          <li>Track your progress across skill tracks</li>
          <li>Level up and unlock achievements!</li>
        </ol>
      </section>

      <section className="description-section">
        <h3>Quest System</h3>
        <p>
          Complete 4 consecutive quests to unlock AI features. The system tracks your
          daily progress and rewards consistent learning. Each quest completion grants
          XP that contributes to both your overall level and language-specific skill
          tracks.
        </p>
      </section>
    </div>
  );
}

export default AppDescription;