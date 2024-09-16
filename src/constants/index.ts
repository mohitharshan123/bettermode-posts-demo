import { PostTypeAllowedReactionsMap, ReactionType } from "types/posts";

export const ROUTES: Record<string, any> = {
  authentication: {
    index: "/authentication",
  },
  dashboard: { index: "/dashboard" },
  posts: { index: "/posts", detail: "/:postId" },
};

export const BASE_URL: string = "https://api.bettermode.com/";
export const GLOBAL_BASE_URL: string = "https://api.bettermode.com/global";
export const ITEMS_PER_PAGE = 10;
export const JWT_TOKEN_COOKIE_NAME = "JWT_TOKEN";

/**
 * Maps each reaction type to its corresponding emoji.
 */
export const REACTION_TYPE_TO_EMOJI: { [key in ReactionType]: string } = {
  [ReactionType.Upvote]: "👍",
  [ReactionType.PlusOne]: "👍",
  [ReactionType.Heart]: "❤️",
  [ReactionType.Tada]: "🎉",
  [ReactionType.Smile]: "😊",
  [ReactionType.OpenMouth]: "😮",
  [ReactionType.Fire]: "🔥",
  [ReactionType.Like]: "👍",
  [ReactionType.Wow]: "😮",
};

export const POST_TYPE_ALLOWED_REACTIONS_MAP: PostTypeAllowedReactionsMap = {
  "7kqVtE8aSNcbRAB": null,
  LM0AXrsLZMwXhRJ: [ReactionType.Upvote],
  zniKmw1nyNB0DvW: [ReactionType.Fire, ReactionType.Like, ReactionType.Wow],
  I1EJfngqGSPKZZ1: [ReactionType.Upvote],
  ySZUbvZ4fZMLqND: [ReactionType.Upvote],
  LVxnfDmQ9niZZjT: null,
  oFgW0lGAs2CWWA6: [
    ReactionType.PlusOne,
    ReactionType.Heart,
    ReactionType.Tada,
    ReactionType.Smile,
    ReactionType.OpenMouth,
  ],
  g5p3Ek3dXEJY98P: [ReactionType.Upvote],
  DrFjtx5u2RDeBw2: [
    ReactionType.PlusOne,
    ReactionType.Heart,
    ReactionType.Tada,
    ReactionType.Smile,
    ReactionType.OpenMouth,
  ],
};

export const REACTION_LABELS_MAP: Record<ReactionType, string> = {
  [ReactionType.Upvote]: "Upvoted!",
  [ReactionType.Fire]: "Hot!",
  [ReactionType.Like]: "Liked!",
  [ReactionType.Wow]: "Wow!",
  [ReactionType.PlusOne]: "Plus One!",
  [ReactionType.Heart]: "Hearted!",
  [ReactionType.Tada]: "Celebrated!",
  [ReactionType.Smile]: "Smiled!",
  [ReactionType.OpenMouth]: "Surprised!",
};
