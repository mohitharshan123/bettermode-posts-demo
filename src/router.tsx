import { Routes, Route } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import Login from "./containers/Authentication";
import Posts from "./containers/Dashboard/Posts";
import PostDetail from "./containers/Dashboard/Posts/Detail";

export const Router = () => {
  return (
    <Routes>
      <Route path="/authentication" element={<Login />} />
      <Route path="/" element={<Dashboard />}>
        <Route path="posts" element={<Posts />} /> {/* Renders Posts at "/" */}
        <Route path="posts/:postId" element={<PostDetail />} />{" "}
      </Route>
    </Routes>
  );
};
