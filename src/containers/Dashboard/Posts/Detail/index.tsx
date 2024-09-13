import { Suspense } from "react";
import DetailCard from "./Card";
import Skeleton from "../Card/Skeleton";

const PostDetail = () => {
  return (
    <Suspense
      fallback={
        <div className="p-10">
          <Skeleton />
        </div>
      }
    >
      <DetailCard />
    </Suspense>
  );
};

export default PostDetail;
