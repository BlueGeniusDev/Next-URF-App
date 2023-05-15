/**
 * Des: Context for state
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { createContext, useContext, useEffect, useState } from "react";
// import language object

import langObj from "@/resource/langObj";
// Creating the user context

const MainContext = createContext();
// Making the function which will wrap the whole app using Context Provider
export const MainContextProvider = ({ children }) => {
  // states
  const [selectedLang, setSelectedLang] = useState("en");
  const [language, setLanguage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("contractor");

  // global states
  const values = {
    selectedLang: selectedLang,
    language: language,
    role: role,
    isLoading: isLoading,

    setSelectedLang: setSelectedLang,
    setRole: setRole,
  };

  useEffect(() => {
    // set language
    if (localStorage.getItem("lang") !== null) {
      setSelectedLang(localStorage.getItem("lang"));
    } else {
      localStorage.setItem("lang", "en");
    }
    setLanguage(langObj[selectedLang]);

    // set login role
    if (localStorage.getItem("role") !== null) {
      setRole(localStorage.getItem("role"));
    } else {
      localStorage.setItem("role", "contractor");
    }
  }, [selectedLang]);

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};
// Make useMainContext Hook to easily use our context throughout the application
export const useMainContext = () => useContext(MainContext);
