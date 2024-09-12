import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { JWT_TOKEN, JWT_TOKEN_LS, ROUTES } from "../constants";

/**
 * Props for the PublicRoute component.
 *
 * @typedef {Object} PublicRouteProps
 * @property {React.ElementType} component - The React component to render if the user is not authenticated.
 */
type PublicRouteProps = {
  component: React.ElementType;
};

/**
 * PublicRoute component for handling public access control.
 *
 * This component allows access to public routes for unauthenticated users. If a user is already authenticated,
 * it can redirect them away from public routes to a restricted area, such as a dashboard. The `restricted` prop
 * determines if the route should be restricted for authenticated users.
 *
 * @param {PublicRouteProps} props - The component props.
 * @param {React.ElementType} props.component - The React component to render if the user is not authenticated.
 *
 * @returns {React.ReactElement} - A React element. Renders the specified component if the user is not authenticated,
 * or redirects to the dashboard if authenticated and `restricted` is `true`.
 *
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem(JWT_TOKEN_LS);

  // Redirect authenticated users if the route is restricted
  if (isAuthenticated) {
    return <Navigate to={ROUTES.posts} state={{ from: location }} />;
  }

  // Render the component if not authenticated or if the route is not restricted
  return <Component />;
};

export default PublicRoute;
