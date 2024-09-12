import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { JWT_TOKEN_LS, ROUTES } from "../constants";
import Cookies from "universal-cookie";

/**
 * Props for the ProtectedRoute component.
 *
 * @typedef {Object} ProtectedRouteProps
 * @property {React.ElementType} component - A React component to render if the user is authenticated.
 */
type ProtectedRouteProps = {
  component: React.ElementType;
};

/**
 * ProtectedRoute component for handling access control to routes that require authentication.
 *
 * This component checks if the user is authenticated by verifying the presence of an API key in local storage.
 * If authenticated, it renders the specified component. If not authenticated, it redirects the user to the
 * authentication route.
 *
 * @param {ProtectedRouteProps} props - The component props.
 * @param {React.ElementType} props.component - The component to render if the user is authenticated.
 *
 * @returns {React.ReactElement} - A React element. Renders the provided component if authenticated,
 * or redirects to the authentication page if not.
 *
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}) => {
  const location = useLocation();
  const cookies = new Cookies();

  // Check if the user is authenticated based on the presence of JWT token.
  const isAuthenticated = !!cookies.get(JWT_TOKEN_LS);

  return isAuthenticated ? (
    // Render the component if authenticated
    <Component />
  ) : (
    // Redirect to the authentication page if not authenticated
    <Navigate to={ROUTES.authentication} state={{ from: location }} />
  );
};

export default ProtectedRoute;
