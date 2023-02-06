import httpService from "./httpService";
import config from "../config.json";

export function registerUser(user) {
  return httpService.post(`${config.apiUrl}/users/`, {
    email: user.username,
    password: user.password,
    name: user.fullname,
  });
}
