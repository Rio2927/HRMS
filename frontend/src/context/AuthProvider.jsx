import { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState("Guest");
  const [user, setUser] = useState({
    name: "",
    email: "",
    employee_id: "",
    avatar: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("user : ", user);
  }, [user]);

  // Safe navigation callback
  const navigateToDashboard = useCallback(() => {
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  // Run navigation when user updates - ONLY if on login page
  useEffect(() => {
    if (user.email && location.pathname === '/login') {
      navigateToDashboard();
    }
  }, [user, location.pathname, navigateToDashboard]);

  useEffect(() => {
    const savedUser = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      employee_id: localStorage.getItem("employee_id"),
      avatar: localStorage.getItem("avatar"),
    };

    if (localStorage.getItem("token")) {
      setUser(savedUser);
    }
  }, []);

  // const login = (userData) => setUser(userData);
  // const logout = () => setUser(null);

  const login = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
    if (!emailRegex.test(email)) {
      return;
    } else {
      fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Response:", data);
          if (data?.success) {
            console.log("Login successful..");

            if (data.token) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("avatar", data.avatar);
              localStorage.setItem("email", data.email);
              localStorage.setItem("employee_id", data.employee_id);
              localStorage.setItem("name", data.name);
              localStorage.setItem("token", data.token);
              // setUser(data.name);

              setUser({
                name: data.name,
                email: data.email,
                employee_id: data.employee_id,
                avatar: data.avatar,
              });

              navigate("/dashboard", { replace: true });
            } else {
              // setError("Invalid credentials");
              console.log("Error aaya..");
            }
          } else {
            alert(data.msg);
            console.log("Login unsuccessful..");
          }
        })
        .catch((err) => console.error("Error:", err));
    }
  };

  const logout = () => {
    // setAnchorEl(null);
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
