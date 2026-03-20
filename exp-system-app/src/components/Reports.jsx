import React, { useState, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from "chart.js";
import { Line as ChartLine, Bar as ChartBar } from "react-chartjs-2";
import { getSkillTracks, getLevel, SKILL_TRACKS } from "../utilis/xpSystem";
import { API_URLS } from "../utilis/apiservices";

ChartJS.register(ArcElement, ChartTooltip, ChartLegend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const COLORS = ["#4f46e5", "#4caf50", "#e74c3c", "#f0a500", "#61dafb", "#54c5f8"];

function Reports({ logs = [], darkMode }) {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("xp");

  useEffect(() => {
    fetch(API_URLS.DASHBOARD_STATS)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  const xp = Number(localStorage.getItem("xp")) || 0;
  const skillTracks = getSkillTracks();

  // XP per skill language data
  const skillXPData = SKILL_TRACKS.map((lang) => ({
    language: lang,
    xp: skillTracks[lang] || 0,
    level: getLevel(skillTracks[lang] || 0),
  }));

  // Quest completion per language from logs
  const questData = {};
  logs.forEach((log) => {
    if (!questData[log.feature]) {
      questData[log.feature] = { language: log.feature, success: 0, fail: 0 };
    }
    if (log.success) questData[log.feature].success += 1;
    else questData[log.feature].fail += 1;
  });
  const questChartData = Object.values(questData);

  // Daily activity from logs
  const dailyData = {};
  logs.forEach((log) => {
    const date = new Date(log.timestamp).toLocaleDateString();
    if (!dailyData[date]) dailyData[date] = { date, total: 0, success: 0, fail: 0 };
    dailyData[date].total += 1;
    if (log.success) dailyData[date].success += 1;
    else dailyData[date].fail += 1;
  });
  const dailyChartData = Object.values(dailyData).slice(-7); // last 7 days

  // AI usage pie data
  const aiPieData = stats
    ? [
        { name: "Successful", value: stats.successful },
        { name: "Failed", value: stats.failed },
      ]
    : [];

  // Chart.js daily activity line chart
  const chartJsLineData = {
    labels: dailyChartData.map((d) => d.date),
    datasets: [
      {
        label: "Total Requests",
        data: dailyChartData.map((d) => d.total),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Successful",
        data: dailyChartData.map((d) => d.success),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Failed",
        data: dailyChartData.map((d) => d.fail),
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartJsLineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: darkMode ? "#fff" : "#2c3e50" } },
      title: { display: true, text: "Daily Activity (Last 7 Days)", color: darkMode ? "#fff" : "#2c3e50" },
    },
    scales: {
      x: { ticks: { color: darkMode ? "#b3b3b3" : "#7f8c8d" } },
      y: { ticks: { color: darkMode ? "#b3b3b3" : "#7f8c8d" } },
    },
  };

  // Chart.js skill XP bar chart
  const chartJsBarData = {
    labels: skillXPData.map((d) => d.language),
    datasets: [
      {
        label: "XP Earned",
        data: skillXPData.map((d) => d.xp),
        backgroundColor: COLORS,
        borderRadius: 6,
      },
    ],
  };

  const chartJsBarOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: darkMode ? "#fff" : "#2c3e50" } },
      title: { display: true, text: "XP per Language", color: darkMode ? "#fff" : "#2c3e50" },
    },
    scales: {
      x: { ticks: { color: darkMode ? "#b3b3b3" : "#7f8c8d" } },
      y: { ticks: { color: darkMode ? "#b3b3b3" : "#7f8c8d" } },
    },
  };

  const tabStyle = (tab) => ({
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: activeTab === tab ? "#4f46e5" : "transparent",
    color: activeTab === tab ? "white" : "var(--text-secondary)",
    fontWeight: activeTab === tab ? "bold" : "normal",
    transition: "all 0.2s",
  });

  return (
    <div className="reports-page">
      <h2>Reports & Analytics</h2>

      {/* Summary Cards */}
      <div className="reports-summary">
        <div className="report-card">
          <h4>Total XP</h4>
          <p>{xp.toLocaleString()}</p>
        </div>
        <div className="report-card">
          <h4>Total Logs</h4>
          <p>{stats?.total_logs || 0}</p>
        </div>
        <div className="report-card">
          <h4>Successful</h4>
          <p style={{ color: "#4caf50" }}>{stats?.successful || 0}</p>
        </div>
        <div className="report-card">
          <h4>Failed</h4>
          <p style={{ color: "#e74c3c" }}>{stats?.failed || 0}</p>
        </div>
        <div className="report-card">
          <h4>Success Rate</h4>
          <p style={{ color: "#4f46e5" }}>
            {stats?.total_logs
              ? Math.round((stats.successful / stats.total_logs) * 100)
              : 0}%
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="reports-tabs">
        <button style={tabStyle("xp")} onClick={() => setActiveTab("xp")}>📈 XP Progress</button>
        <button style={tabStyle("quests")} onClick={() => setActiveTab("quests")}>🎯 Quest Stats</button>
        <button style={tabStyle("ai")} onClick={() => setActiveTab("ai")}>🤖 AI Usage</button>
        <button style={tabStyle("daily")} onClick={() => setActiveTab("daily")}>📅 Daily Activity</button>
      </div>

      {/* XP Progress Tab */}
      {activeTab === "xp" && (
        <div className="report-section">
          <h3>XP per Language (Recharts)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillXPData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#404040" : "#e0e0e0"} />
              <XAxis dataKey="language" tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
              <YAxis tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
              <Tooltip contentStyle={{ background: darkMode ? "#333" : "#fff", border: "none", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="xp" name="XP Earned" radius={[6, 6, 0, 0]}>
                {skillXPData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <h3 style={{ marginTop: "30px" }}>XP per Language (Chart.js)</h3>
          <ChartBar data={chartJsBarData} options={chartJsBarOptions} />
        </div>
      )}

      {/* Quest Stats Tab */}
      {activeTab === "quests" && (
        <div className="report-section">
          <h3>Quest Completion per Language</h3>
          {questChartData.length === 0 ? (
            <p className="no-data">No quest data yet. Complete some quests to see stats!</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={questChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#404040" : "#e0e0e0"} />
                <XAxis dataKey="language" tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
                <YAxis tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
                <Tooltip contentStyle={{ background: darkMode ? "#333" : "#fff", border: "none", borderRadius: "8px" }} />
                <Legend />
                <Bar dataKey="success" name="Success" fill="#4caf50" radius={[6, 6, 0, 0]} />
                <Bar dataKey="fail" name="Failed" fill="#e74c3c" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          <h3 style={{ marginTop: "30px" }}>Level per Language</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillXPData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#404040" : "#e0e0e0"} />
              <XAxis dataKey="language" tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
              <YAxis tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
              <Tooltip contentStyle={{ background: darkMode ? "#333" : "#fff", border: "none", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="level" name="Level" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* AI Usage Tab */}
      {activeTab === "ai" && (
        <div className="report-section">
          <h3>AI Usage Breakdown</h3>
          {aiPieData.length === 0 || (stats?.total_logs === 0) ? (
            <p className="no-data">No AI usage data yet.</p>
          ) : (
            <div className="pie-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={aiPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {aiPieData.map((_, index) => (
                      <Cell key={index} fill={index === 0 ? "#4caf50" : "#e74c3c"} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: darkMode ? "#333" : "#fff", border: "none", borderRadius: "8px" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Daily Activity Tab */}
      {activeTab === "daily" && (
        <div className="report-section">
          <h3>Daily Activity — Last 7 Days (Recharts)</h3>
          {dailyChartData.length === 0 ? (
            <p className="no-data">No activity data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#404040" : "#e0e0e0"} />
                <XAxis dataKey="date" tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
                <YAxis tick={{ fill: darkMode ? "#b3b3b3" : "#7f8c8d" }} />
                <Tooltip contentStyle={{ background: darkMode ? "#333" : "#fff", border: "none", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="total" name="Total" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="success" name="Success" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="fail" name="Failed" stroke="#e74c3c" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}

          <h3 style={{ marginTop: "30px" }}>Daily Activity (Chart.js)</h3>
          {dailyChartData.length === 0 ? (
            <p className="no-data">No activity data yet.</p>
          ) : (
            <ChartLine data={chartJsLineData} options={chartJsLineOptions} />
          )}
        </div>
      )}
    </div>
  );
}

export default Reports;