import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  // If no token then send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists then allow access
  return <Outlet />;
}

export default ProtectedRoute;
