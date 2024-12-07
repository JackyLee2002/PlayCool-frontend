import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserInfo(savedToken);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  const login = async (username, password) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    const data = await response.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      await fetchUserInfo(data.token);
      router.push("/");
    }
  };

  const register = async (username, password) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    if (response.ok) {
      await login(username, password);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
