import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Pages/Auth/ProtectedRoutes";
import AuthCallback from "./Pages/Auth/AuthCallBack";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/Dashboard1" element={<Dashboard />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
