import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:3002",
    timeout: 3000,
  });

  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 500) {
    
        window.location = "/";
      }
      return Promise.reject(error);
    }
  );

  export default instance;