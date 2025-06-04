import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = () => {
  const { logado } = useAuth();

  return logado ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
