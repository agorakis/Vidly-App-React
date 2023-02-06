import httpService from "./httpService";
import config from "../config.json";

export function loginUser(user) {
  return httpService.post(`${config.apiUrl}/auth/`, {
    email: user.username,
    password: user.password,
  });
}
