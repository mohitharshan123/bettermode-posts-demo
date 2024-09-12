import { useFetchPosts } from "../../../hooks/graphql/usePosts";
import PostCard from "./Card";
import { Post } from "../../../types/posts";

const Posts = () => {
  const { data } = useFetchPosts();

  return (
    <div className="flex flex-grow overscroll-y-none">
      <section className="p-10 flex flex-col gap-10 w-[100vw]">
        {data?.posts?.nodes?.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
};

export default Posts;
