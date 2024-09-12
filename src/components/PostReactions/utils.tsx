import {
  POST_TYPE_ALLOWED_REACTIONS_MAP,
  REACTION_TYPE_TO_EMOJI,
} from "../../constants";
import { Post, ReactionType } from "../../types/posts";

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
