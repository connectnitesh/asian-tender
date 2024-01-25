"use client"
import React, { createContext, useContext, useState } from "react";

const TenderContext = createContext();

export const TenderProvider = ({ children }) => {
  const [tenderData, setTenderData] = useState([]);

  const updateTenderData = (newData) => {
    setTenderData(newData);
  };

  return (
    <TenderContext.Provider value={{ tenderData, updateTenderData }}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTender = () => {
  return useContext(TenderContext);
};
