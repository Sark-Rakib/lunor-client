import axios from "axios";

const useAxios = axios.create({
  baseURL: "https://lunor-server.vercel.app",
});

const useAxiosSecure = () => {
  return useAxios;
};

export default useAxiosSecure;
