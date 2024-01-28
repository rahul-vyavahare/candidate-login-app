import { Navigate, Outlet ,useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export  const ProtectedRoute  = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth ? <Outlet /> : <Navigate  to="/" state = {{from:location}} replace/>;
};
