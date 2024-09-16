import {
  POST_TYPE_ALLOWED_REACTIONS_MAP,
  REACTION_TYPE_TO_EMOJI,
} from "constants/index";
import { Post, ReactionType } from "types/posts";

export const getAllowedReactions = (post: Post) =>
  Object.values(ReactionType)
    .filter((type) =>
      POST_TYPE_ALLOWED_REACTIONS_MAP[post.postTypeId]?.includes(type)
    )
    .map((reactionType) => ({
      label: reactionType,
      node: <div>{REACTION_TYPE_TO_EMOJI[reactionType]}</div>,
      key: reactionType,
    }));

/**
 * Checks if the given post contains a reaction from the authenticated member
 * that matches the current reaction type.
 *
 * @param {Object} post - The post object containing reactions.
 * @param {Object} user - The data object containing the authenticated member ID.
 * @param {string} currentReaction - The reaction type to match.
 * @returns {boolean} - Returns true if a matching reaction is found, false otherwise.
 */
export const isSameReaction = (
  post: Post,
  user: Member,
  currentReaction: string
) => {
  return post.reactions.some(
    (reaction) =>
      reaction.participants.nodes.some(
        (node) => node.participant.id === user.id
      ) && reaction.reaction === currentReaction
  );
};
