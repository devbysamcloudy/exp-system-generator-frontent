import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import GoogleLoginButton from "../components/GoogleLogin";
//import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored user:", storedUser);
    console.log("Entered email:", email);
    console.log("Entered password:", password);

    if (!storedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      console.log("Login successful!");
      localStorage.setItem("token", "dummy-token");
      navigate("/dashboard");
    } else {
      console.log("Email match:", email === storedUser.email);
      console.log("Password match:", password === storedUser.password);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Login" type="submit" />
      </form>

      <div className="google-login-wrapper">
        <GoogleLoginButton />
      </div>
    </div>
  );
}

export default Login;
