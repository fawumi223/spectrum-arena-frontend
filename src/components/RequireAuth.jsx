import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * RequireAuth
 * ----------------------------------------------------
 * Guards protected routes.
 * - If NOT authenticated → redirect to Login
 * - Preserves intended destination for post-login redirect
 * - Supports both wrapper & nested route usage
 */
export default function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("access"); // <-- FIXED: use "access"

  // Not authenticated → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Authenticated → render protected content
  return children ? children : <Outlet />;
}

