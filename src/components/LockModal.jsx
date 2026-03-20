import React from "react";
import { getConsecutiveQuestsCompleted } from "../utilis/lockUtilis";

function LockModal({ usedRequests, onUnlock, onExit }) {
  const completedQuests = getConsecutiveQuestsCompleted();
  const questsNeeded = Math.max(0, 4 - completedQuests);
  const unlockable = completedQuests >= 4;

  return (
    <div className="lock-overlay">
      <div className="lock-modal">
        <h2>🔒 Locked Mode!</h2>
        <div className="lock-content">
          <p>
            You have used <strong>{usedRequests}</strong> AI requests today.
          </p>
          <p>
            Daily limit of <strong>20</strong> requests reached.
          </p>

          <div className="unlock-progress">
            <p>Complete <strong>4 consecutive quests</strong> to unlock:</p>
            <div className="quest-dots">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`quest-dot ${i <= completedQuests ? "completed" : ""}`}
                />
              ))}
            </div>
            {unlockable ? (
              <p className="unlock-ready">✅ Ready to unlock!</p>
            ) : (
              <p className="unlock-needed">
                {questsNeeded} more quest{questsNeeded > 1 ? "s" : ""} needed
              </p>
            )}
          </div>
        </div>

        <div className="lock-actions">
          <button
            className="unlock-btn"
            onClick={onUnlock}
            disabled={!unlockable}
            style={{ opacity: unlockable ? 1 : 0.5, cursor: unlockable ? "pointer" : "not-allowed" }}
          >
            Unlock
          </button>
          <button className="exit-btn" onClick={onExit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default LockModal;