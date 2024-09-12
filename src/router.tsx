import { Routes, Route } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import Login from "./containers/Authentication";
import Posts from "./containers/Dashboard/Posts";
import PostDetail from "./containers/Dashboard/Posts/Detail";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/authentication"
        element={<PublicRoute component={Login} />}
      />
      <Route path="/" element={<Dashboard />}>
        <Route path="posts" element={<ProtectedRoute component={Posts} />} />{" "}
        {/* Renders Posts at "/" */}
        <Route path="posts/:postId" element={<PostDetail />} />{" "}
      </Route>
    </Routes>
  );
};
