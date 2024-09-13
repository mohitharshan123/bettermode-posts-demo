import { useParams } from "react-router-dom";

import { useGetPost } from "graphql/posts/usePosts";
import PostReactions from "components/PostReactions";
import { getAllowedReactions } from "components/PostReactions/utils";

import { cleanHtmlContent } from "../utils";

const DetailCard: React.FC = () => {
  const { postId } = useParams();

  const { data } = useGetPost(postId);

  const title = data?.post.fields.find((field) => field.key === "title");
  const content = data?.post.fields.find((field) => field.key === "content");

  const tags = data?.post?.tags.map(({ title }) => title);

  return (
    <div>
      <div className="bg-white border m-10 border-gray-200 shadow-lg rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-800 p-6">
        <div className="flex justify-center mb-6">
          <img
            src={data?.post.space.image.url}
            alt="Post Image"
            className="rounded-xl shadow-lg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {data?.post.space.name}
          </h2>
        </div>

        <h1 className="font-bold text-xl mb-10 text-gray-800 dark:text-white">
          {cleanHtmlContent(title?.value)}
        </h1>

        <div
          dangerouslySetInnerHTML={{ __html: cleanHtmlContent(content?.value) }}
          className="text-gray-600 dark:text-white whitespace-pre-line"
        ></div>

        {tags.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-200 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-blue-700 dark:text-blue-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {getAllowedReactions(data?.post).length && (
          <PostReactions post={data?.post} />
        )}
      </div>
    </div>
  );
};

export default DetailCard;
