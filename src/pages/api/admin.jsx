/**
 * Des: sales admin API router
 * created_at: 2023.05.16
 * updated_at: 2023.05.16
 */

// import third-party libraries
import { API_URL } from "../../resource/config";

const config = async (lang) => {
  let al = lang === "sp" ? "es" : lang;
  const accessToken = localStorage.getItem("accessToken");

  return { al, accessToken };
};

export const getPredefinedUsers = async (lang) => {
  try {
    // const res = await getAccessToken(al);

    // if (!res.accessToken) {
    //   return res;
    // } else {
    const configData = await config(lang);
    const res = await fetch(`${API_URL}sales/predefined-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": configData.al,
        Authorization: `Bearer ${configData.accessToken}`,
      },
    });

    return await res.json();
    // }
  } catch (error) {
  }
};

export const getSalesUsers = async (lang) => {
  try {
    const configData = await config(lang);

    const res = await fetch(`${API_URL}sales/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": configData.al,
        Authorization: `Bearer ${configData.accessToken}`,
      },
    });

    return await res.json();
  } catch (error) {
  }
};

export const createSalesUser = async (values, lang) => {
  try {
    const configData = await config(lang);

    const res = await fetch(`${API_URL}sales/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${configData.accessToken}`,
      },
      body: JSON.stringify(values),
    });
    return await res.json();
  } catch (error) {
  }
};

export const delSalesUser = async (id, lang) => {
  const configData = await config(lang);

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": configData.al,
      Authorization: `Bearer ${configData.accessToken}`,
    },
  };

  const res = await fetch(`${API_URL}sales/user/${id}`, requestOptions);
  return await res.json();
};
