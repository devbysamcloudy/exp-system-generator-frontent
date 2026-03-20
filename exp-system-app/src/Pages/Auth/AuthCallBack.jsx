import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utilis/authUtils";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      await supabase.auth.getSession();
      navigate("/dashboard", { replace: true });
    };
    checkSession();
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
