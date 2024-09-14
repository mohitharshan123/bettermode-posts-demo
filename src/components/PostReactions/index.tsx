import React, { useRef } from "react";

import clsx from "clsx";

import { FaAngleUp } from "react-icons/fa";
import { Post, ReactionType } from "types/posts";
import useClickOutside from "hooks/useClickOutside";
import { REACTION_TYPE_TO_EMOJI } from "constants/index";
import { useFetchAuthUser } from "graphql/user/useAuthUser";
import {
  ReactionBarSelector,
  ReactionCounter,
} from "@charkour/react-reactions";

import useReactions from "./useReactions";
import { getAllowedReactions } from "./utils";

interface PostReactionsProps {
  post: Post;
}

const PostReactions: React.FC<PostReactionsProps> = ({ post }) => {
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
        <div className="flex flex-col sm:flex-row gap-1 justify-between w-full items-center">
          <button
            onClick={() => handleReaction(ReactionType.Upvote)}
            className={clsx(
              "text-white px-4 py-2 rounded-md flex flex-row items-center gap-2",
              {
                "dark:bg-gray-800 bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500":
                  !post.reactions?.[0]?.reacted,
                "dark:bg-gray-500 bg-gray-500 hover:bg-gray-600  dark:hover:bg-gray-700":
                  !!post.reactions?.[0]?.reacted,
              }
            )}
          >
            <span>Upvote</span>
            <FaAngleUp />
          </button>
          <span className="text-gray-800 dark:text-white">
            {post.reactionsCount} {`vote${post.reactionsCount > 1 || post.reactionsCount == 0 ? "s" : ""}`}
          </span>
        </div>
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
            className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-500 dark:bg-neutral-800 dark:border-neutral-700"
          >
            {post.reactions?.[0]?.reacted ? reactionEmoji : "Like"}
          </button>
          <div className="reaction-container">
            <ReactionCounter
              className="text-gray-800 dark:text-white"
              showOthersAlways={false}
              user={user.authMember?.name}
              reactions={post?.reactions?.map(({ reaction, participants }) => ({
                node: (
                  <div>{REACTION_TYPE_TO_EMOJI[reaction as ReactionType]}</div>
                ),
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
