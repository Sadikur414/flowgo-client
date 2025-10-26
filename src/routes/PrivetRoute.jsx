import useAuth from "../Hooks/useAuth";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export default PrivetRoute;
