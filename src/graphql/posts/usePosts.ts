import {
  MutationOptions,
  useMutation,
  useSuspenseQuery,
  SuspenseQueryHookOptions,
} from "@apollo/client/index.js";
import { FETCH_POSTS_QUERY, GET_POST_QUERY } from "./queries";
import { ADD_REACTION_MUTATION, REMOVE_REACTION_MUTATION } from "./mutations";
import { CacheUpdater } from "./cacheUpdator";
import { ITEMS_PER_PAGE } from "constants/index";
import { useFetchAuthUser } from "../user/useAuthUser";
import { Post } from "types/posts";

export const useFetchPosts = (options?: SuspenseQueryHookOptions): any =>
  useSuspenseQuery(FETCH_POSTS_QUERY, {
    variables: {
      offset: 0,
      limit: ITEMS_PER_PAGE,
      orderByString: "publishedAt",
      reverse: true,
    },
    ...options,
  });

export const useGetPost = (
  id: string | undefined,
  options?: SuspenseQueryHookOptions
) =>
  useSuspenseQuery<{ post: Post }>(GET_POST_QUERY, {
    variables: {
      id,
    },
    ...options,
  });

export const useReaction = (options?: MutationOptions) => {
  const { data: user } = useFetchAuthUser();

  return useMutation(ADD_REACTION_MUTATION, {
    update(cache, { data }, reaction) {
      if (data.addReaction?.status !== "succeeded") return;
      CacheUpdater.addReactionToCache({
        cache,
        data,
        reaction,
        user: user.authMember,
      });
    },
    onError(error) {
      console.error("Error updating reaction:", error);
    },
    ...options,
  });
};

export const useRemoveReaction = (options?: MutationOptions) => {
  const { data: user } = useFetchAuthUser();

  return useMutation(REMOVE_REACTION_MUTATION, {
    update(cache, { data }, reaction) {
      if (data.removeReaction?.status !== "succeeded") return;

      CacheUpdater.removeReactionFromCache({
        cache,
        reaction,
        user: user.authMember,
      });
    },
    onError(error) {
      console.error("Error updating reaction:", error);
    },
    ...options,
  });
};
