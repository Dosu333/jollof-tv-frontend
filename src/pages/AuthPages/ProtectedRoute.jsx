// ProtectedRoute.tsx
import React from "react";
import { Route, Navigate, useLocation, Outlet } from "react-router-dom";

import { toast } from "react-toastify";
import { getCookie } from "../../api/utility";

const ProtectedRoute = () => {
  const location = useLocation();

  let access = getCookie("id1");
  let refresh = getCookie("id2");

  return access && refresh ? (
    <Outlet />
  ) : (
    <>
      {toast.error("Kindly Login to access this page!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        toastId: "nosession",
      })}
      <Navigate to="/signin" />
    </>
  );
};

export default ProtectedRoute;