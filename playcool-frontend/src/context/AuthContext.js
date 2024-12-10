import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserInfo(savedToken);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      console.log(token);
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (err) {
      setError(null);
      setOpen(false);
    }
  };

  const openLogin = () => {
    setLoginOpen(true);
  }

  const login = async (username, password) => {
    try {
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
      setLoginOpen(false);
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        await fetchUserInfo(data.token);
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
      setOpen(true);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        }
      );
      setLoginOpen(false);
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      await login(username, password);
    } catch (err) {
      setError(err.message);
      setOpen(true);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setLoginOpen(false);
    router.push("/");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, error, login, register, logout, loginOpen,openLogin }}
    >
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
