import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();



  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decodedToken = jwtDecode(savedToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
      } else {
        setToken(savedToken);
        fetchUserInfo(savedToken);
      }
    }
    setLoading(false);
  }, []);



  const fetchUserInfo = async (token) => {
    try {
      setLoading(true);
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
        setLoading(false);
        localStorage.removeItem("token");
        throw new Error("Failed to fetch user info");
      }
      setLoading(false);
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(null);
      setOpen(false);
    }
  };

  const openLogin = () => {
    setLoginOpen(true);
  };

  const createOrder = async (orderDetails) => {
    try {
      const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderDetails),
          }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
      return data;
    } catch (err) {
      setError(err.message);
      setOpen(true);
    }
  };

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
          value={{
            user,
            token,
            error,
            login,
            register,
            logout,
            loginOpen,
            openLogin,
            createOrder,
            loading,
          }}
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