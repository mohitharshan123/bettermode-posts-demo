import { useState, RefObject } from "react";
import {
  POST_TYPE_ALLOWED_REACTIONS_MAP,
  REACTION_LABELS_MAP,
  REACTION_TYPE_TO_EMOJI,
} from "constants/index";
import { useReaction, useRemoveReaction } from "graphql/posts/usePosts";
import { Post, ReactionType } from "types/posts";
import { useFetchAuthUser } from "graphql/user/useAuthUser";
import { isSameReaction } from "./utils";

/**
 * Custom hook to handle reactions for a post.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Post} params.post - The post object to handle reactions for.
 * @param {RefObject<HTMLDivElement>} params.popupRef - Ref object for the popup element.
 * @param {RefObject<HTMLButtonElement>} params.buttonRef - Ref object for the button element.
 *
 * @returns {Object} - The state and handlers related to reactions.
 * @returns {Function} handleReaction - Function to handle reaction actions.
 * @returns {string} reactionEmoji - The emoji of the current reaction.
 * @returns {boolean} isPopupOpen - Boolean indicating if the reaction popup is open.
 */
const useReactions = ({
  post,
}: {
  post: Post;
  popupRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
}) => {
  const { data: user } = useFetchAuthUser();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [reactPost] = useReaction();
  const [removeReaction] = useRemoveReaction();

  const isUpvoteType =
    POST_TYPE_ALLOWED_REACTIONS_MAP[post.postTypeId]?.includes(
      ReactionType.Upvote
    ) ?? false;

  const handleReaction = (currentReaction: string) => {
    if (isSameReaction(post, user.authMember, currentReaction)) {
      removeReaction({
        variables: {
          postId: post.id,
          reaction: currentReaction,
        },
      });
    } else {
      reactPost({
        variables: {
          postId: post.id,
          input: {
            reaction: currentReaction,
            overrideSingleChoiceReactions: true,
          },
        },
      });
    }
    setIsPopupOpen(false);
  };

  const reactionKey = post.reactions?.[0]?.reaction as ReactionType;
  const reactionEmoji = REACTION_TYPE_TO_EMOJI[reactionKey] ?? "Like";
  const reactionLabel = REACTION_LABELS_MAP[reactionKey];

  return {
    handleReaction,
    reactionEmoji,
    isPopupOpen,
    setIsPopupOpen,
    isUpvoteType,
    reactionLabel,
  };
};

export default useReactions;
