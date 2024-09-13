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
export const JWT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkR1MkhQVkZyYUMiLCJuZXR3b3JrSWQiOiJwNXdreHNMd3Q1IiwibmV0d29ya0RvbWFpbiI6InNhYXNwbGV4LW9kMnhiMXlvLmJldHRlcm1vZGUuaW8iLCJ0b2tlblR5cGUiOiJVU0VSIiwiZW50aXR5SWQiOm51bGwsInBlcm1pc3Npb25Db250ZXh0IjpudWxsLCJwZXJtaXNzaW9ucyI6bnVsbCwic2Vzc2lvbklkIjoiTWNZc3FEWkhQdWc1cklzeUpQVUNnS2tobllBQmN0S1RWZmJSRE1NajZJRlFrWkswTGUiLCJpYXQiOjE3MjU4OTYxNjQsImV4cCI6MTcyODQ4ODE2NH0.twyHfwHo_8Lag5E4B2mL6d0sWO-fO9xB7qX3e_Ew5u0";

export const JWT_TOKEN_LS = "JWT_TOKEN";

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
