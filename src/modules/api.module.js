import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  validateStatus: (status) => {
    if (status === 401) {
      Promise.reject(401);
      return false;
    }
    return true;
  },
});

api.interceptors.request.use((request) => {
  return request;
});

api.interceptors.response.use((response) => {
  return response.data;
})