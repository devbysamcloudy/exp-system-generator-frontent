# EXP System Dashboard — Frontend

The frontend of the EXP System Dashboard built with React and Vite. A gamified developer dashboard that monitors coding activity, tracks XP progress, and generates coding quests based on GitHub repositories.

---

## 🛠 Tech Stack

- **React** (Vite)
- **Monaco Editor** (`@monaco-editor/react`)
- **React Router DOM**
- **Recharts**
- **Chart.js** + `react-chartjs-2`
- **CSS Variables** for theming

---

## 📁 Project Structure
```
src/
├── components/
│   ├── AIMonitoring.jsx        # Activity log table
│   ├── AuditLogs.jsx           # Full history with filters and CSV export
│   ├── CodeEditor.jsx          # Monaco editor with language support
│   ├── DailyQuestCard.jsx      # Rotating daily coding challenges
│   ├── DashboardStats.jsx      # Live stats from backend
│   ├── GitHubStats.jsx         # GitHub language detector
│   ├── LockModal.jsx           # AI access lock modal
│   ├── NotificationBell.jsx    # Real-time notification bell
│   ├── ProgressBar.jsx         # Animated XP progress bar
│   ├── QuestGenerator.jsx      # Language-based quest generator
│   ├── Reports.jsx             # Charts and analytics
│   ├── Settings.jsx            # Profile and preferences
│   ├── SkillTracks.jsx         # Per-language XP tracking
│   ├── SideBar.jsx             # Navigation sidebar
│   └── TopBar.jsx              # Top navigation bar
├── Pages/
│   ├── Dashboard.jsx           # Main dashboard page
│   └── Auth/
│       └── ProtectedRoutes.jsx
├── utilis/
│   ├── apiservices.js          # Centralized API URLs
│   ├── authUtils.js            # Auth helper functions
│   ├── lockUtils.js            # AI lock mechanism logic
│   ├── notificationUtils.js    # Notification event helpers
│   ├── questBank.js            # 20 questions per language
│   └── xpSystem.js             # XP, level, and skill track logic
└── Dashboard.css               # Global styles with CSS variables
```

---

## ⚙️ Installation

**1. Clone the repository:**
```bash
git clone https://github.com/devbysamcloudy/exp-system-generator-app.git
cd exp-system-generator-app
```

**2. Install dependencies:**
```bash
npm install
npm install recharts chart.js react-chartjs-2
```

**3. Start the development server:**
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔧 Configuration

All API URLs are centralized in `src/utilis/apiservices.js`:
```javascript
// Development
const BASE_URL = "http://127.0.0.1:8000/api";

// Production — change this one line to switch environments
const BASE_URL = "https://your-production-url.com/api";

export const API_URLS = {
  AILOGS: `${BASE_URL}/ai-logs`,
  DASHBOARD_STATS: `${BASE_URL}/dashboard-stats`,
  GITHUB_STATS: `${BASE_URL}/github-stats`,
  AI_DETECTION: `${BASE_URL}/ai-detection`,
};
```

---

## 🗂 Pages & Navigation

| Section | Description |
|---------|-------------|
| 🏠 Dashboard | Overview with XP, daily quest, skill tracks, GitHub stats and AI monitoring |
| ⭐ XP Progress | Full XP progress bar and skill track breakdown |
| 📋 Daily Quests | Daily quest card and quest generator |
| 🎯 Skill Tracks | Per-language XP and level progress |
| 🤖 AI Monitoring | Activity log table |
| 📊 Reports | Charts and analytics |
| 📜 Audit Logs | Full history with filters and CSV export |
| ⚙️ Settings | Profile, theme, and XP reset |

---

## 🏆 XP Rewards by Language

| Language | XP Reward |
|----------|-----------|
| React | 80 XP |
| Flutter | 80 XP |
| Java | 70 XP |
| TypeScript | 70 XP |
| JavaScript | 60 XP |
| Python | 60 XP |
| CSS | 40 XP |
| HTML | 40 XP |
| Default | 50 XP |

---

## 🔒 Lock Mechanism

- AI access locks after **20 daily requests**
- User must complete **4 consecutive quests** to unlock
- Progress tracked in `localStorage` via `lockUtils.js`
- Lock status derived from state — no `useEffect` needed

---

## 📦 Quest Bank

- **20 unique questions** per language in `questBank.js`
- Completed quest IDs stored in `localStorage`
- No repeats until all 20 are completed
- Auto-resets when all questions are done

---

## 🎨 Theming

Dark and light mode use CSS variables defined in `Dashboard.css`:
```css
.dark {
  --bg-primary: #1a1a1a;
  --card-bg: #333333;
  --text-primary: #ffffff;
  /* ... */
}

.light {
  --bg-primary: #f5f7fa;
  --card-bg: #ffffff;
  --text-primary: #2c3e50;
  /* ... */
}
```

Theme preference persists in `localStorage` across sessions.

---

## 📱 Responsive Design

- Mobile hamburger menu with sidebar overlay
- Topbar XP and request counter hidden on small screens
- All grids stack vertically on mobile
- Notification dropdown full width on mobile
- Breakpoints: `1024px`, `768px`, `480px`

---

## 🔔 Notifications

Notifications fire automatically on these events:

| Event | Message |
|-------|---------|
| Quest complete | ✅ Quest complete: "{title}" — +{xp} XP |
| Level up | 🎉 You leveled up to Level {n}! |
| Skill level up | ⭐ Your {language} skill reached Level {n}! |
| AI locked | 🔒 AI access locked — complete 4 quests to unlock |
| AI unlocked | 🔓 AI access unlocked! You're good to go |
| GitHub connected | 🐙 GitHub connected for {username}! |
