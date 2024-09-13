import { useState, RefObject } from "react";
import {
  POST_TYPE_ALLOWED_REACTIONS_MAP,
  REACTION_TYPE_TO_EMOJI,
} from "../../constants";
import { useReaction, useRemoveReaction } from "../../graphql/posts/usePosts";
import { Post, ReactionType } from "../../types/posts";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [reactPost] = useReaction();
  const [removeReaction] = useRemoveReaction();

  const isUpvoteType =
    POST_TYPE_ALLOWED_REACTIONS_MAP[post.postTypeId]?.includes(
      ReactionType.Upvote
    ) ?? false;

  const handleReaction = (reaction: string) => {
    if (
      (post.reactions?.[0]?.reacted && isUpvoteType) ||
      post.reactions?.[0]?.reaction == reaction
    ) {
      removeReaction({
        variables: {
          postId: post.id,
          reaction,
        },
      });
    } else {
      reactPost({
        variables: {
          postId: post.id,
          input: { reaction, overrideSingleChoiceReactions: true },
        },
      });
    }
    setIsPopupOpen(false);
  };

  const reactionKey = post.reactions?.[0]?.reaction as ReactionType;
  const reactionEmoji = REACTION_TYPE_TO_EMOJI[reactionKey] ?? "Like";

  return {
    handleReaction,
    reactionEmoji,
    isPopupOpen,
    setIsPopupOpen,
    isUpvoteType,
  };
};

export default useReactions;
