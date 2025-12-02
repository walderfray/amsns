const API_BASE_URL = "http://localhost:8000";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
    ME: "/auth/me",
  },
  KYC: {
    SUBMIT: "/kyc/submit",
    INFO: "/kyc/info",
  },
  // Add other endpoints here
};

export default API_BASE_URL;
