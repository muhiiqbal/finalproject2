import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const RouteProtect = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RouteProtect;