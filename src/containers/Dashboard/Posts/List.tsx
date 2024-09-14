import { useTransition } from "react";
import { useFetchPosts } from "graphql/posts/usePosts";
import { Post } from "types/posts";
import PostCard from "./Card";
import Skeleton from "./Card/Skeleton";

import { FaArrowDown } from "react-icons/fa";
import { ITEMS_PER_PAGE } from "constants/index";

const PostsList = () => {
  const [isPending, startTransition] = useTransition();

  const { data, fetchMore } = useFetchPosts();

  const handleLoadMore = () => {
    startTransition(() => {
      fetchMore({
        variables: {
          limit: ITEMS_PER_PAGE,
          offset: data.posts?.nodes.length,
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
        <span className="sr-only">Show More</span>
      </button>
    </div>
  );

  return (
    <>
      {data?.posts?.nodes?.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {isPending &&
        Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)}
      {data?.posts.pageInfo?.hasNextPage && <LoadMoreButton />}
    </>
  );
};

export default PostsList;
