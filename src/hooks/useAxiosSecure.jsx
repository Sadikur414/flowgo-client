import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  // -------------------------------
  // REQUEST INTERCEPTOR
  // -------------------------------
  AxiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // -------------------------------
  // RESPONSE INTERCEPTOR
  // -------------------------------
  AxiosSecure.interceptors.response.use(
    (res) => res,

    async (error) => {
      const status = error?.response?.status;

      if (status === 401) {
        await logOut();
        navigate("/login");
      }


      if (status === 403) {
        navigate("/forbidden");
      }

      return Promise.reject(error);
    }
  );

  return AxiosSecure;
};

export default useAxiosSecure;
