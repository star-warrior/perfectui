import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // First, check for user in URL (after Google OAuth)
        const params = new URLSearchParams(window.location.search);
        const userParam = params.get("user");
        if (userParam) {
          try {
            const userData = JSON.parse(decodeURIComponent(userParam));
            setUser(userData);
            window.history.replaceState(null, "", window.location.pathname);
            setLoading(false);
            return;
          } catch {
            console.error("Failed to parse user data from URL");
          }
        }

        // If no user in URL, check if user is already logged in via session
        const response = await axios.get("http://localhost:8080/auth/profile", {
          withCredentials: true,
        });

        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch {
        console.log("No active session found");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
