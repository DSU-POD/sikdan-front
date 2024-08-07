import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((request) => {
  return request;
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status >= 400 && status < 600) {
        return Promise.reject(data);
      }
      return false;
    }
  }
);
