import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) {
    return <div>Loading...</div>; 
  }
  if (!user) {
    return <Navigate state={{from:location.pathname}} to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivetRoute;
