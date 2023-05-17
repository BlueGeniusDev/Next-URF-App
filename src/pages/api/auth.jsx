/**
 * Des: aut API router
 * created_at: 2023.05.12
 * updated_at: 2023.05.12
 */

// import third-party libraries
import { API_URL } from "../../resource/config";

export const auth = async (uri, values, lang) => {
  try {
    let al = lang === "sp" ? "es" : lang;

    const res = await fetch(`${API_URL}/auth/${uri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": al,
      },
      body: JSON.stringify(values),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};