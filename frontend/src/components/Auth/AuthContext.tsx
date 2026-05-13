import React, { createContext, ReactNode, useEffect, useState } from "react";
import { LoginCredentials } from "../../api/models/auth";
import { UserPublic } from "../../api/models/user";
import { fetchCurrentUser } from "../../api/core/users";
import { loginApi } from "../../api/core/auth";

interface AuthContextType {
  user: UserPublic | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchCurrentUser()
        .then(setUser)
        .catch((error) => {logout(); throw error;})
        .finally();
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await loginApi(credentials);

    localStorage.setItem("access_token", response.access);
    localStorage.setItem("refresh_token", response.refresh);

    await fetchCurrentUser()
      .then(setUser)
      .catch((error) => {logout(); throw error;})
  };

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
