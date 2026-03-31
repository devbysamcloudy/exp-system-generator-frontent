import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

// supabaseClient.js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true },
});

////// Logout function
export const useLogout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }
    navigate("/", { replace: true });
  };
  return logout;
};
