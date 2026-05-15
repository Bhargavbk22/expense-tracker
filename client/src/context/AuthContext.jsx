import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("expense_tracker_token");
    if (!token) {
      setBooting(false);
      return;
    }

    authService
      .profile()
      .then(({ user: profile }) => setUser(profile))
      .catch(() => localStorage.removeItem("expense_tracker_token"))
      .finally(() => setBooting(false));
  }, []);

  const login = async (payload) => {
    const data = await authService.login(payload);
    localStorage.setItem("expense_tracker_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    localStorage.setItem("expense_tracker_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("expense_tracker_token");
      setUser(null);
    }
  };

  const value = useMemo(() => ({ user, booting, login, register, logout, isAuthenticated: Boolean(user) }), [user, booting]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
