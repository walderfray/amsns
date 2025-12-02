import { createFetcher } from "./fetcher";
import { client } from "./client";
import { ENDPOINTS } from "../config";

export const authApi = {
  login: createFetcher({
    url: ENDPOINTS.AUTH.LOGIN,
    method: "POST",
  }),
  
  register: createFetcher({
    url: ENDPOINTS.AUTH.REGISTER,
    method: "POST",
  }),
  
  forgotPassword: (email) => createFetcher({
    url: ENDPOINTS.AUTH.FORGOT_PASSWORD,
    method: "POST",
    body: { email },
  })(),
  
  changePassword: (data) => client.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
  
  resetPassword: (token, newPassword) => createFetcher({
    url: ENDPOINTS.AUTH.RESET_PASSWORD,
    method: "POST",
    body: { token, new_password: newPassword },
  })(),

  getMe: () => client.get(ENDPOINTS.AUTH.ME),
};
