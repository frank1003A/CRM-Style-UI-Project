"use client";

import React, { createContext, useContext, useState } from "react";

type LeadContextType = {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const value = {
    activeIndex,
    setActiveIndex,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLeadsContext() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error("useLeadsContext must be used within a LeadsProvider");
  }
  return context;
}
