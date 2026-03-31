import React, { useState, useRef } from "react";

function Settings() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [firstName, setFirstName] = useState(storedUser.firstName || "");
  const [lastName, setLastName] = useState(storedUser.lastName || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || null
  );
  const fileInputRef = useRef(null);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setProfilePic(base64);
      localStorage.setItem("profilePic", base64);
      window.location.reload();
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePic = () => {
    setProfilePic(null);
    localStorage.removeItem("profilePic");
    window.location.reload();
  };

  const handleSave = () => {
    const updatedUser = { firstName, lastName, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  const handleResetXP = () => {
    localStorage.setItem("xp", 0);
    alert("XP has been reset.");
    window.location.reload();
  };

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    window.location.reload();
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      <div className="profile-settings">
        <h3>Profile</h3>

        <div className="profile-pic-section">
          <img
            src={profilePic || "https://www.gravatar.com/avatar/?d=mp"}
            alt="Profile"
            className="profile-pic-preview"
          />
          <div className="profile-pic-actions">
            <button onClick={() => fileInputRef.current.click()}>
              📷 Upload Photo
            </button>
            {profilePic && (
              <button
                onClick={handleRemovePic}
                className="remove-pic-btn"
              >
                🗑️ Remove Photo
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSave}>Save Profile</button>
      </div>

      <div className="preferences-settings">
        <h3>Preferences</h3>
        <button onClick={toggleTheme}>🌙 Toggle Dark/Light Mode</button>
        <button onClick={handleResetXP}>🔄 Reset XP</button>
      </div>
    </div>
  );
}

export default Settings;