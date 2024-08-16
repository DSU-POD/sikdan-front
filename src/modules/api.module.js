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

export const formDataApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  validateStatus: (status) => {
    if (status === 401 || status === 400) {
      Promise.reject(status);
      return false;
    }
    return true;
  },
});

formDataApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(401);
  }

  request.headers.Authorization = `Bearer ${token}`;

  return request;
});

formDataApi.interceptors.response.use(
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
