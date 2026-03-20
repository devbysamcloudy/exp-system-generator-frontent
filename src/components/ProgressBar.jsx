import React from "react";

function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
      <span className="progress-label">{Math.round(progress)}%</span>
    </div>
  );
}

export default ProgressBar;