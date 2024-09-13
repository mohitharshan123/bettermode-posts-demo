import {
  ReactionBarSelector,
  ReactionCounter,
} from "@charkour/react-reactions";
import clsx from "clsx";
import { useRef } from "react";
import { FaAngleUp } from "react-icons/fa";
import { Post, ReactionType } from "types/posts";
import { getAllowedReactions } from "./utils";
import useReactions from "./useReactions";
import useClickOutside from "hooks/useClickOutside";
import { useFetchAuthUser } from "graphql/user/useAuthUser";
import { REACTION_TYPE_TO_EMOJI } from "constants/index";

const PostReactions: React.FC<{ post: Post }> = ({ post }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { data: user } = useFetchAuthUser();

  const {
    handleReaction,
    reactionEmoji,
    isPopupOpen,
    setIsPopupOpen,
    isUpvoteType,
  } = useReactions({
    post,
    popupRef,
    buttonRef,
  });

  useClickOutside({ popupRef, buttonRef, action: () => setIsPopupOpen(false) });

  return (
    <div className="relative flex justify-between items-center border-t border-gray-200 dark:border-neutral-700 pt-4 mt-4">
      {isUpvoteType ? (
        <button
          onClick={() => handleReaction(ReactionType.Upvote)}
          className={clsx(
            "text-white px-4 py-2 rounded-md flex flex-row items-center gap-2",
            {
              "dark:bg-gray-800 bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-500":
                !post.reactions?.[0]?.reacted,
              "dark:bg-gray-500 bg-blue-300 hover:bg-blue-400  dark:hover:bg-blue-300":
                !!post.reactions?.[0]?.reacted,
            }
          )}
        >
          <span>Upvote</span>
          <FaAngleUp />
        </button>
      ) : (
        <>
          {isPopupOpen && (
            <div
              ref={popupRef}
              className="absolute mb-32 bg-white border border-gray-200 shadow-lg rounded-lg p-4 mt-2 dark:bg-neutral-800 dark:border-neutral-700"
            >
              <ReactionBarSelector
                reactions={getAllowedReactions(post)}
                iconSize={20}
                onSelect={handleReaction}
              />
            </div>
          )}
          <button
            ref={buttonRef}
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-neutral-800 dark:border-neutral-700"
          >
            {post.reactions?.[0]?.reacted ? reactionEmoji : "Like"}
          </button>

          <div className="reaction-container">
            <ReactionCounter
              showOthersAlways={false}
              user={user.authMember?.name}
              reactions={post?.reactions?.map(({ reaction, participants }) => ({
                node: <div>{REACTION_TYPE_TO_EMOJI[reaction]}</div>,
                label: "Liked by",
                by: participants?.nodes[0]?.participant.name,
              }))}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PostReactions;
