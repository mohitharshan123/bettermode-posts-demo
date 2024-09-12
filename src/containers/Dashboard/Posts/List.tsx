import { useFetchPosts } from "../../../hooks/graphql/usePosts";
import { Post } from "../../../types/posts";
import PostCard from "./Card";

const PostsList = () => {
  const { data } = useFetchPosts();

  return (
    <>
      {data?.posts?.nodes?.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
