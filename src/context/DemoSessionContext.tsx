"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface DemoSessionContextType {
  demoUser: User | null;
  isDemoAuthenticated: boolean;
  loginDemo: (email: string) => void;
  logoutDemo: () => void;
}

const DemoSessionContext = createContext<DemoSessionContextType | undefined>(undefined);

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [demoUser, setDemoUser] = useState<User | null>(null);

  const loginDemo = (email: string) => {
    // Basic extraction of a name from the email for the demo UI
    const name = email.split("@")[0].split(/[._-]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    setDemoUser({ name: name || "User", email });
  };

  const logoutDemo = () => {
    setDemoUser(null);
  };

  return (
    <DemoSessionContext.Provider value={{ demoUser, isDemoAuthenticated: !!demoUser, loginDemo, logoutDemo }}>
      {children}
    </DemoSessionContext.Provider>
  );
}

export function useDemoSession() {
  const context = useContext(DemoSessionContext);
  if (context === undefined) {
    throw new Error("useDemoSession must be used within a DemoSessionProvider");
  }
  return context;
}
