import { useTransition } from "react";
import { useFetchPosts } from "graphql/posts/usePosts";
import { Post } from "types/posts";
import PostCard from "./Card";
import Skeleton from "./Card/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

import { FaArrowDown } from "react-icons/fa";
import { ITEMS_PER_PAGE } from "constants/index";
import useScrollStore from "stores/useScrollStore";

const PostsList = () => {
  const [isPending, startTransition] = useTransition();
  const isInfiniteScrollEnabled = useScrollStore(
    (state) => state.isInfiniteScrollEnabled
  );

  const { data, fetchMore } = useFetchPosts();

  const handleLoadMore = () => {
    if (!data?.posts.pageInfo.hasNextPage) return; // Prevent fetch if no more pages

    startTransition(() => {
      fetchMore({
        variables: {
          limit: ITEMS_PER_PAGE,
          offset: data.posts?.nodes.length || 0, // Offset based on current number of posts
        },
      });
    });
  };

  const LoadMoreButton = () => (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleLoadMore}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full dark:bg-gray-700 dark:hover:bg-gray-800 flex items-center space-x-2"
      >
        <FaArrowDown className="w-5 h-5" />
        <span>Show More</span>
      </button>
    </div>
  );

  return (
    <>
      {isInfiniteScrollEnabled ? (
        <InfiniteScroll
          dataLength={data?.posts?.nodes?.length || 0}
          next={handleLoadMore}
          hasMore={data?.posts.pageInfo?.hasNextPage}
          loader={
            <div className="flex justify-center flex-col mt-10 gap-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
            </div>
          }
        >
          <div className="flex flex-col gap-10">
            {data?.posts?.nodes?.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <>
          {data?.posts?.nodes?.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {isPending &&
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          {data?.posts.pageInfo?.hasNextPage && <LoadMoreButton />}
        </>
      )}
    </>
  );
};

export default PostsList;
