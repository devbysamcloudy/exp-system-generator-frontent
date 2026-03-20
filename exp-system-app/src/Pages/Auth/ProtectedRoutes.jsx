import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../utilis/authUtils";

const AuthContext = createContext({
  user: null,
  userdata: null,
  session: null,
  loading: true,
  setUserdata: () => {},
});
export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null); // auth.users object
  const [userdata, setUserdata] = useState(null); // app-specific users table row
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      setSession(data.session ?? null);

      if (currentUser) {
        // fetch the corresponding row in your users table
        const { data: userDataRow, error } = await supabase
          .from("users")
          .select("*") // all allowed columns
          .eq("user_id", currentUser.id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setUserdata(userDataRow);
        }
      }

      setLoading(false);
    }

    fetchUser();

    const { subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setSession(session ?? null);
      },
    );

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <AuthContext.Provider
      value={{
        user,
        userdata,
        session,
        loading,
        setUserdata,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ProtectedRoute;
