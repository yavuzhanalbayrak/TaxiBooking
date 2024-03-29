import { useState } from "react";
import AuthContext from "./AuthContext";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setTokenn] = useState(localStorage.getItem("token") || null);

  const setToken = async (token) => {
    setTokenn(token);
  };

  const logout = async () => {
    setTokenn(null);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const values = {
    token,
    setToken,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
