import React, { useEffect } from "react";
import { useUser } from "../featuers/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const { isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!token && !isLoading) navigate("/login");
    },
    [token, isLoading]
  );

  if (isLoading) return <Spinner />;

  if (token) return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;
