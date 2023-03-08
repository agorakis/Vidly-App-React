import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

export function getUser() {
  try {
    const jwt = localStorage.getItem("token");
    const currentUser = jwtDecode(jwt);
    return currentUser;
  } catch (error) {
    return {};
  }
}

export function loginUser(user) {
  return httpService.post(`${config.apiUrl}/auth/`, {
    email: user.username,
    password: user.password,
  });
}

httpService.setJwt(getJwt());

function getJwt() {
  return localStorage.getItem("token");
}
