import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://be-datasamicj.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
