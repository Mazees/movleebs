import React from "react";
import { useAuth } from "../contexts/AuthAdmin";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="min-h-[60vh] flex poppins-bold items-center justify-center"
      >
        Memuat Sesi...
      </div>
    );
  }
  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRouteAdmin;
