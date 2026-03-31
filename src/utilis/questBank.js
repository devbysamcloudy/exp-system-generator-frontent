import React, { useState } from "react";
import { getXPReward } from "../utilis/xpSystem";
import { getNextQuest, markQuestCompleted, getQuestProgress } from "../utilis/questBank";
import CodeEditor from "./CodeEditor";

function QuestGenerator({ languages, onQuestAccepted, darkMode }) {
  const [currentQuest, setCurrentQuest] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const generateQuest = () => {
    if (!languages || languages.length === 0) return;
    const randomLang = languages[Math.floor(Math.random() * languages.length)];
    const quest = getNextQuest(randomLang);
    const xpReward = getXPReward(randomLang);
    setCurrentQuest({ ...quest, language: randomLang, xpReward });
    setUserCode("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!userCode.trim()) {
      alert("Please write your solution first!");
      return;
    }

    setSubmitted(true);
    const passed = currentQuest.test(userCode);

    if (passed) {
      markQuestCompleted(currentQuest.id);
      onQuestAccepted && onQuestAccepted({ ...currentQuest, userCode });
      setCurrentQuest(null);
      setUserCode("");
      setSubmitted(false);
    } else {
      alert("Incorrect solution. Try again!");
      setSubmitted(false);
    }
  };

  return (
    <div className="quest-generator">
      <h3>Quest Generator</h3>

      {languages && languages.length > 0 && (
        <div className="quest-progress-overview">
          {languages.map((lang) => {
            const progress = getQuestProgress(lang);
            return (
              <div key={lang} className="quest-progress-item">
                <span>{lang}</span>
                <span>{progress.completed}/{progress.total} quests</span>
                <div className="quest-mini-bar">
                  <div
                    className="quest-mini-fill"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={generateQuest}
        disabled={!languages || languages.length === 0}
      >
        Generate Quest from My Languages
      </button>

      {currentQuest && (
        <div className="generated-quest">
          <div className="quest-header-row">
            <span className="quest-language">{currentQuest.language}</span>
            <span className={`quest-diff diff-${currentQuest.difficulty?.toLowerCase()}`}>
              {currentQuest.difficulty}
            </span>
          </div>
          <p>{currentQuest.description}</p>
          <CodeEditor
            onCodeChange={setUserCode}
            language={currentQuest.language}
            darkMode={darkMode}
          />
          <button onClick={handleSubmit} disabled={submitted}>
            {submitted ? "Checking..." : `Submit Quest (+${currentQuest.xpReward} XP)`}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestGenerator;