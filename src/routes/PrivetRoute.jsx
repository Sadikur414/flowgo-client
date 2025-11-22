import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/Shared/Loading";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivetRoute;
