/**
 * Des: Context for state
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { createContext, useContext, useEffect, useState } from "react";

// Creating the user context
const MainContext = createContext();

// import language object
import langObj from "@/resource/langObj";

// Making the function which will wrap the whole app using Context Provider
export const AppStore = ({ children }) => {
  // language state
  const [selectedLang, setSelectedLang] = useState("en");
  const [language, setLanguage] = useState({});
  // login role
  const [loginRole, setLoginRole] = useState("contractor");

  // global states
  const values = {
    selectedLang: selectedLang,
    language: language,
    loginRole: loginRole,
    setSelectedLang: setSelectedLang,
    setLoginRole: setLoginRole,
  };

  useEffect(() => {
    // set language
    if (sessionStorage.getItem("lang") !== null) {
      setSelectedLang(sessionStorage.getItem("lang"));
    } else {
      sessionStorage.setItem("lang", "en");
    }
    setLanguage(langObj[selectedLang]);

    // set login role
    if (sessionStorage.getItem("loginRole") !== null) {
      setLoginRole(sessionStorage.getItem("loginRole"));
    } else {
      sessionStorage.setItem("loginRole", "contractor");
    }
  }, [selectedLang]);

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

// Make useMainContext Hook to easily use our context throughout the application
export const useMainContext = () => useContext(MainContext);
