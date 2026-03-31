import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./Auth.css";

function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="auth-outer">
      <div className="auth-inner">
        {showLogin ? <Login /> : <Signup />}
        <div className="auth-toggle">
          {showLogin ? (
            <p>
              Don't have an account?{" "}
              <span
                className="auth-link"
                onClick={() => setShowLogin(false)}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                className="auth-link"
                onClick={() => setShowLogin(true)}
              >
                Log in
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;