import GoogleLogo from "../assets/google-logo.jpg";
import { supabase } from "../utilis/authUtils";

function GoogleLoginButton() {
  ////////////////////////////////////

  const redirectTo = `${import.meta.env.VITE_BASE_URL}/auth/callback`;
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) console.error("Google login error:", error.message);
  };

  ///////////////////////////////////
  return (
    <button
      style={{
        backgroundColor: "#fff",
        color: "#444",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "12px",
        borderRadius: "8px", // rounded corners
        cursor: "pointer",
        fontSize: "1rem",
      }}
      onClick={handleLogin}
    >
      <img src={GoogleLogo} alt="G" style={{ width: "20px", height: "20px" }} />
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton;
