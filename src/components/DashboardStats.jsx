import React, { useState, useEffect } from "react";
import { API_URLS } from "../utilis/apiservices";

function DashboardStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(API_URLS.DASHBOARD_STATS)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="dashboard-stats">
      <h3>AI Usage Stats</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Logs</h4>
          <p>{stats.total_logs}</p>
        </div>
        <div className="stat-card">
          <h4>Successful</h4>
          <p>{stats.successful}</p>
        </div>
        <div className="stat-card">
          <h4>Failed</h4>
          <p>{stats.failed}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;