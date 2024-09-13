import moment from "moment";
import { useNavigate } from "react-router-dom";

import { Post } from "types/posts";
import PostReactions from "components/PostReactions";
import { getAllowedReactions } from "components/PostReactions/utils";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-800 p-6">
      <div className="flex items-center mb-4">
        <img
          src={post.owner.member.profilePicture.url}
          alt="Job Poster"
          className="rounded-full w-16 h-16 object-cover border-2 border-blue-500 dark:border-blue-300"
        />
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            {post.owner.member.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            {moment(post?.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div>
        <h3
          onClick={() => navigate(post.id)}
          className="cursor-pointer text-xl font-semibold text-gray-800 dark:text-white mb-2"
        >
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-neutral-300 mb-4">
          {post.description}
        </p>
      </div>
      {getAllowedReactions(post).length && <PostReactions {...{ post }} />}
    </div>
  );
};

export default PostCard;
