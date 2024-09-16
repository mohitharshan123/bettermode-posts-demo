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

type PostReactionsProps = {
  post: Post;
};

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
    reactionLabel,
  } = useReactions({
    post,
    popupRef,
    buttonRef,
  });

  useClickOutside({ popupRef, buttonRef, action: () => setIsPopupOpen(false) });
  const allowedReactions = getAllowedReactions(post);
  return (
    <div className="relative flex justify-between items-center border-t border-gray-200 dark:border-neutral-700 pt-4 mt-4">
      {isUpvoteType ? (
        <div className="flex flex-col sm:flex-row gap-1 justify-between w-full items-center">
          <button
            onClick={() => handleReaction(ReactionType.Upvote)}
            className={clsx(
              "text-white px-4 py-2 rounded-md flex flex-row items-center gap-2",
              {
                "dark:bg-gray-700 bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600":
                  !post.reactions?.[0]?.reacted,
                "dark:bg-gray-600 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500":
                  !!post.reactions?.[0]?.reacted,
              }
            )}
          >
            <span>Upvote</span>
            <FaAngleUp />
          </button>
          <span className="text-gray-800 dark:text-white">
            {post.reactionsCount}{" "}
            {`vote${
              post.reactionsCount > 1 || post.reactionsCount == 0 ? "s" : ""
            }`}
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
                reactions={allowedReactions}
                iconSize={20}
                onSelect={handleReaction}
              />
            </div>
          )}
          <button
            ref={buttonRef}
            onClick={() => setIsPopupOpen(!isPopupOpen)}
            className="px-4 py-2 rounded-md bg-gray-300 text-white flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-500 dark:bg-neutral-800 dark:border-neutral-700"
          >
            <span>{post.reactions?.[0]?.reacted ? reactionEmoji : "Like"}</span>
            <span className="text-sm text-gray-800 dark:text-gray-300">{reactionLabel}</span>
          </button>
          {allowedReactions.length > 0 && (
            <div className="reaction-container">
              <ReactionCounter
                className="text-gray-800 dark:text-white"
                showOthersAlways={false}
                user={user.authMember?.name}
                reactions={post?.reactions?.map(
                  ({ reaction, participants }) => ({
                    node: (
                      <div>
                        {REACTION_TYPE_TO_EMOJI[reaction as ReactionType]}
                      </div>
                    ),
                    label: "Liked by",
                    by: participants?.nodes[0]?.participant.name,
                  })
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostReactions;
