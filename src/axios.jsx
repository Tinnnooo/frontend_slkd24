import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://tinno.dikelasawan.my.id:8443/api/v1/",
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      throw error;
    }

    throw error;
  }
);

export default axiosClient;
