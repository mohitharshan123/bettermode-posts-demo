import { Suspense } from "react";
import PostsList from "./List";
import Skeleton from "./Card/Skeleton";

const Posts = () => {
  return (
    <div className="flex flex-grow overscroll-y-none">
      <section className="p-10 flex flex-col gap-10 w-[100vw]">
        <Suspense
          fallback={Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} />
          ))}
        >
          <PostsList />
        </Suspense>
      </section>
    </div>
  );
};

export default Posts;
