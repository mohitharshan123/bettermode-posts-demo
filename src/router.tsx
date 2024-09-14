import BounceLoader from "components/BounceLoader";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = lazy(() => import("containers/Dashboard"));
const Login = lazy(() => import("containers/Authentication"));
const Posts = lazy(() => import("containers/Dashboard/Posts"));
const PostDetail = lazy(() => import("containers/Dashboard/Posts/Detail"));
const NotFound = lazy(() => import("containers/NotFound"));

export const Router = () => {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <BounceLoader />
        </div>
      }
    >
      <Routes>
        <Route path="/authentication" element={<Login />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:postId" element={<PostDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
