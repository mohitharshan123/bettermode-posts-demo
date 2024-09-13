import { useParams } from "react-router-dom";
import { useGetPost } from "../../../../graphql/posts/usePosts";
import { cleanHtmlContent } from "../utils";
import PostReactions from "../../../../components/PostReactions";
import { getAllowedReactions } from "../../../../components/PostReactions/utils";

const DetailCard: React.FC = () => {
  const { postId } = useParams();

  const { data } = useGetPost(postId);
  const title = data?.post.fields.find((field) => field.key === "title");

  const content = data?.post.fields.find((field) => field.key === "content");

  return (
    <div>
      <div className="bg-white border m-10 border-gray-200 shadow-lg rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-800 p-6">
        <h1 className="font-bold text-xl mb-10">
          {cleanHtmlContent(title?.value)}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: cleanHtmlContent(content?.value) }}
          className="text-white whitespace-pre-line"
        ></div>
        {getAllowedReactions(data?.post).length && (
          <PostReactions post={data?.post} />
        )}
      </div>
    </div>
  );
};

export default DetailCard;
