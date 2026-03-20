import React from "react";

function AIMonitoring({ logs }) {
  return (
    <div className="ai-monitoring">
      <h2>AI Monitoring</h2>
      {logs.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <ul>
          {logs.map((log, i) => (
            <li key={i}>
              <strong>{log.user}</strong> used <em>{log.feature}</em>:{" "}
              {log.success ? "Success" : "Fail"} at{" "}
              {new Date(log.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AIMonitoring;