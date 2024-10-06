import { showToast } from "@/components/layout/toast";
import axios from "axios";
import Router from "next/router";

export const api = axios.create({
  baseURL: `/api/`,
  validateStatus: (status) => {
    if (status === 401) {
      showToast("다시 로그인 후 시도해주세요.", true);
      return false;
    }

    return status >= 200 && status < 300;
  },
});

api.interceptors.request.use((request) => {
  // jwt 검사 예외 경로
  const exceptPath = [
    "/member/login",
    "/member/find_id",
    "/member/find_password",
    "/member/register/complete",
    "/member/register/duplicate",
  ];

  if (!exceptPath.includes(request.url)) {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("다시 로그인 해주세요.", true);
      Router.push(`/member/logout`);
      return false;
    }

    request.headers.Authorization = `Bearer ${token}`;
  }
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
        const isError = true;
        showToast(data.message, isError);
        return Promise.reject(status);
      }
      return false;
    }
  }
);

export const formDataApi = axios.create({
  baseURL: `/api/`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  validateStatus: (status) => {
    if (status === 401) {
      showToast("다시 로그인 후 시도해주세요.");
      return false;
    } else {
      return true;
    }
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
