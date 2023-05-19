/**
 * Des: API router for refresh token
 * created_at: 2023.05.16
 * updated_at: 2023.05.16
 */

// import third-party libraries
import jwtDecode from "jwt-decode";

// import third-party libraries
import { API_URL } from "../../resource/config";
import { refreToken } from "./auth";

const getAccessToken = async (lang) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const { exp, iat } = jwtDecode(accessToken);

  if (exp * 1000 - Date.now() < (exp - iat) * 1000) {
    try {
      const data = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      const res = await refreToken(data, lang);
      if (!res.code) {
        localStorage.setItem("accessToken", res.accessToken);
      }

      return res;
    } catch (err) {
      throw new Error("Failed to refresh access token");
    }
  }
};

export default getAccessToken;
