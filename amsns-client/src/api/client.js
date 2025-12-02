import { createFetcher } from "./fetcher";

const getAuth = () => {
  const token = localStorage.getItem("token");
  // console.log("getAuth token:", token);
  if (!token) return null;
  
  return {
    accessToken: token,
  };
};

const handle401 = (error) => {
  if (error.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Don't redirect, let the app handle the state change
    // window.location.href = "/login";
  }
  return error;
};

export const client = {
  get: async (endpoint) => {
    try {
      const fetcher = createFetcher({
        url: endpoint,
        method: "GET",
        auth: getAuth(),
      });
      return await fetcher();
    } catch (error) {
      handle401(error);
      throw error;
    }
  },

  post: async (endpoint, body) => {
    try {
      const fetcher = createFetcher({
        url: endpoint,
        method: "POST",
        body,
        auth: getAuth(),
      });
      return await fetcher();
    } catch (error) {
      handle401(error);
      throw error;
    }
  },
  
  put: async (endpoint, body) => {
    try {
      const fetcher = createFetcher({
        url: endpoint,
        method: "PUT",
        body,
        auth: getAuth(),
      });
      return await fetcher();
    } catch (error) {
      handle401(error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const fetcher = createFetcher({
        url: endpoint,
        method: "DELETE",
        auth: getAuth(),
      });
      return await fetcher();
    } catch (error) {
      handle401(error);
      throw error;
    }
  },
};
