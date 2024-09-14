import { Routes, Route } from "react-router-dom";

import Dashboard from "containers/Dashboard";
import Login from "containers/Authentication";
import Posts from "containers/Dashboard/Posts";
import PostDetail from "containers/Dashboard/Posts/Detail";
import NotFound from "containers/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route path="/authentication" Component={Login} />
      <Route path="/" Component={Dashboard}>
        <Route path="posts" Component={Posts} />
        <Route path="posts/:postId" Component={PostDetail} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
