import axios from "axios";

const baseURL = "https://centercourseziad.somee.com/api/v1.0/";
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // config.url += config.url.includes("?")
    //   ? "&api-version=2.0"
    //   : "?api-version=2.0";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// adding a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
