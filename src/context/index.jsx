/**
 * Des: Context for state
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

import { auth } from "../pages/api/auth";
import langObj from "@/resource/langObj";
import { APP_URL } from "@/resource/config";

// Creating the user context
const MainContext = createContext();
// Making the function which will wrap the whole app using Context Provider
export const MainContextProvider = ({ children }) => {
  const navigator = useRouter();
  // states
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");
  const [language, setLanguage] = useState({});
  const [loginImg, setLoginImg] = useState("contractor");
  const [loginMsg, setLoginMsg] = useState("");

  // global states
  const values = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    selectedLang: selectedLang,
    language: language,
    loginImg: loginImg,
    loginMsg: loginMsg,

    setSelectedLang: setSelectedLang,
    setLoginImg: setLoginImg,

    // function to login user
    login: async (loginvalues) => {
      const res = await auth("auth/sign-in", loginvalues, selectedLang);

      if (!res.code) {
        setAccessToken(res.accessToken);
        localStorage.setItem("accessToken", res.accessToken);
        setRefreshToken(res.refreshToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.removeItem("loginMsg");

        switch (res.role) {
          case "admin-sales":
            navigator.push(`${APP_URL}admin/sales`);
            break;

          default:
            navigator.push(`${APP_URL}`);
            break;
        }
      } else {
        setLoginMsg(res.message);
        localStorage.setItem("loginMsg", res.message);
      }
    },

    // function to logout user
    logout: async () => {
      setAccessToken("");
      localStorage.removeItem("accessToken");
      setRefreshToken("");
      localStorage.removeItem("refreshToken");
    },

    // check authedUser
    isAuthed: async () => {
      if (localStorage.getItem("accessToken")) {
        const jwt_payload = jwtDecode(localStorage.getItem("accessToken"))
        switch (jwt_payload.organizationRole) {
          case "admin-sales":
            navigator.push("/admin/sales");
            break;

          default:
            break;
        }
      }
    },
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
    if (localStorage.getItem("loginImg") !== null) {
      setLoginImg(localStorage.getItem("loginImg"));
    } else {
      localStorage.setItem("loginImg", "contractor");
    }
  }, [selectedLang]);

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};
// Make useMainContext Hook to easily use our context throughout the application
export const useMainContext = () => useContext(MainContext);
