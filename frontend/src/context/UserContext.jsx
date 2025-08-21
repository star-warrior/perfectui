import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in URL (after Google OAuth)
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
    if (userParam) {
      try {
        setUser(JSON.parse(decodeURIComponent(userParam)));
        window.history.replaceState(null, "", window.location.pathname);
      } catch {
        console.error("Failed to parse user data from URL", userParam);
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
