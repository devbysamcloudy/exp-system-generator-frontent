import React, { useState, useEffect } from "react";
import { API_URLS } from "../utilis/apiservices";

function AuditLogs({ localLogs = [] }) {
  const [backendLogs, setBackendLogs] = useState([]);
  const [filter, setFilter] = useState({
    date: "",
    language: "",
    status: "all",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URLS.AILOGS)
      .then((res) => res.json())
      .then((data) => {
        setBackendLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch backend logs:", err);
        setLoading(false);
      });
  }, []);

  // Merge local and backend logs, remove duplicates by timestamp
  const allLogs = [...localLogs, ...backendLogs].filter(
    (log, index, self) =>
      index === self.findIndex((l) => l.timestamp === log.timestamp)
  );

  // Get unique languages for filter dropdown
  const languages = [...new Set(allLogs.map((log) => log.feature).filter(Boolean))];

  // Apply filters
  const filteredLogs = allLogs.filter((log) => {
    const logDate = new Date(log.timestamp).toLocaleDateString();
    const filterDate = filter.date
      ? new Date(filter.date).toLocaleDateString()
      : null;

    const matchDate = !filterDate || logDate === filterDate;
    const matchLanguage = !filter.language || log.feature === filter.language;
    const matchStatus =
      filter.status === "all" ||
      (filter.status === "success" && log.success) ||
      (filter.status === "fail" && !log.success);

    return matchDate && matchLanguage && matchStatus;
  });

  // Sort by most recent first
  const sortedLogs = [...filteredLogs].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Export to CSV
  const exportCSV = () => {
    const headers = ["User", "Feature", "Status", "Timestamp"];
    const rows = sortedLogs.map((log) => [
      log.user || "Unknown",
      log.feature || "Unknown",
      log.success ? "Success" : "Fail",
      new Date(log.timestamp).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilter({ date: "", language: "", status: "all" });
  };

  return (
    <div className="audit-logs">
      <div className="audit-header">
        <h2>Audit Logs / History</h2>
        <button className="export-btn" onClick={exportCSV}>
          📥 Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="audit-filters">
        <div className="filter-item">
          <label>Date</label>
          <input
            type="date"
            value={filter.date}
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          />
        </div>
        <div className="filter-item">
          <label>Language</label>
          <select
            value={filter.language}
            onChange={(e) => setFilter({ ...filter, language: e.target.value })}
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label>Status</label>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="fail">Failed</option>
          </select>
        </div>
        <button className="clear-filter-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Stats Bar */}
      <div className="audit-stats-bar">
        <span>Total: <strong>{sortedLogs.length}</strong></span>
        <span className="success-count">
          ✅ Success: <strong>{sortedLogs.filter((l) => l.success).length}</strong>
        </span>
        <span className="fail-count">
          ❌ Failed: <strong>{sortedLogs.filter((l) => !l.success).length}</strong>
        </span>
      </div>

      {/* Logs Table */}
      {loading ? (
        <p className="audit-loading">Loading logs...</p>
      ) : sortedLogs.length === 0 ? (
        <p className="audit-empty">No logs found for the selected filters.</p>
      ) : (
        <div className="audit-table-wrapper">
          <table className="audit-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Feature / Language</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {sortedLogs.map((log, index) => (
                <tr key={index} className={log.success ? "row-success" : "row-fail"}>
                  <td>{index + 1}</td>
                  <td>{log.user || "Unknown"}</td>
                  <td>
                    <span className="log-feature-badge">{log.feature || "Unknown"}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${log.success ? "success" : "fail"}`}>
                      {log.success ? "✅ Success" : "❌ Failed"}
                    </span>
                  </td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AuditLogs;