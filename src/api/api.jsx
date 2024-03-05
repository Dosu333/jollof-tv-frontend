import axios from "axios";
import { toast } from "react-toastify";
import { deleteCookie, getCookie } from "./utility";

export const USER_CREATE = "/auth/users/";
export const USER_LOGIN = "/auth/login/";
export const TOKEN_REFRESH = "/auth/token/refresh/";
export const GET_USERS = "/auth/users/";
export const RESET_PASSWORD = "/auth/users/reset-password/";
export const CREATE_PASSWORD = "/auth/users/create-password/";
export const GET_VIDEOS = "/tv/videos/";


const api = axios.create({
  baseURL: "https://jolloftv.pythonanywhere.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

/// Signup
export const signupApi = async (data) => {
  const loadingToastId = toast.info("Creating account...", {
    position: "top-right",
    autoClose: false,
    toastId: "signup1",
  });

  try {
    const response = await api.post(USER_CREATE, data);

    toast.dismiss(loadingToastId);

    if (response.status === 201) {
      toast.success("Account Created!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        toastId: "signupc",
      });
    } else {
      toast.error("Account not Created!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        toastId: "signupn",
      });
    }
    return { success: true, access: "", refresh: "", results: [] };
  } catch (error) {
    console.error("Error during signup:", error);
    toast.dismiss(loadingToastId);

    toast.error("Account not Created! Please try again.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      toastId: "signupe",
    });

    return { success: false, access: "", refresh: "", results: [] };
  }
};
// Signup

// LogIn
export const loginApi = async (data) => {
  const loadingToastId = toast.info("Logging in...", {
    position: "top-right",
    autoClose: false,
    toastId: "login",
  });

  try {
    const response = await api.post(USER_LOGIN, data);

    toast.dismiss(loadingToastId);

    if (response.status === 200) {
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        toastId: "login",
      });
    } else {
      toast.error("Login Failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        toastId: "login",
      });
    }
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    toast.dismiss(loadingToastId);

    toast.error("Invalid Username or Password! Please try again.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      toastId: "err",
    });

    return { success: false, access: "", refresh: "", results: [] };
  }
};
// LogIn

//Logout
export const logUserOut = () => {
  
  if (window.confirm("Do you want to log out")) {
    deleteCookie("id1");
    deleteCookie("id2");
    window.location.replace("/signin");
    toast.success("Logged Out!", {
      position: "top-right",
      autoClose: 3000,
      toastId: "login",
      hideProgressBar: true,
    });
  }
};
//Logout

//GetVideos
export const getVideosApi = async () => {
  const authToken = `${getCookie("id1")}`;
  try {
    const response = await api.get(GET_VIDEOS, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during getVideosApi:", error);
  }
};
//GetVideos
