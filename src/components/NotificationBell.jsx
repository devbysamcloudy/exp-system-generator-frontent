import React, { useState, useRef, useEffect } from "react";

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });
  const wrapperRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = (e) => {
    e.stopPropagation();
    const saved = localStorage.getItem("notifications");
    setNotifications(saved ? JSON.parse(saved) : []);
    setOpen((prev) => !prev);
  };

  const markAllRead = (e) => {
    e.stopPropagation();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const markRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setNotifications([]);
    localStorage.setItem("notifications", JSON.stringify([]));
  };

  return (
    <div className="notification-wrapper" ref={wrapperRef}>
      <button className="notification-bell-btn" onClick={handleOpen}>
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {open && (
        <div
          className="notification-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="notification-header">
            <span>Notifications</span>
            <div className="notification-actions">
              <button onClick={markAllRead}>Mark all read</button>
              <button onClick={clearAll}>Clear</button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <p className="notification-empty">No notifications</p>
          ) : (
            <ul className="notification-list">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`notification-item ${n.read ? "read" : "unread"}`}
                  onClick={() => markRead(n.id)}
                >
                  <span className="notification-message">{n.message}</span>
                  <span className="notification-time">{n.time}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="notification-footer">
            {unreadCount > 0 ? (
              <span className="notification-status warning">
                ⚠️ {unreadCount} unread
              </span>
            ) : (
              <span className="notification-status ok">
                ✅ All Systems Normal
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;