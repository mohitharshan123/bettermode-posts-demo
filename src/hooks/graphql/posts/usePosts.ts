import {
  MutationOptions,
  useMutation,
  useSuspenseQuery,
  SuspenseQueryHookOptions,
} from "@apollo/client/index.js";
import { FETCH_POSTS_QUERY, GET_POST_QUERY } from "./queries";
import { ADD_REACTION_MUTATION, REMOVE_REACTION_MUTATION } from "./mutations";
import { CacheUpdater } from "./cacheUpdator";
import { ITEMS_PER_PAGE } from "../../../constants";

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
  useSuspenseQuery(GET_POST_QUERY, {
    variables: {
      id,
    },
    ...options,
  });

export const useReaction = (options?: MutationOptions) =>
  useMutation(ADD_REACTION_MUTATION, {
    update(cache, { data }, reaction) {
      CacheUpdater.addReactionToCache(cache, data, reaction);
    },
    onError(error) {
      console.error("Error updating reaction:", error);
    },
    ...options,
  });

export const useRemoveReaction = (options?: MutationOptions) =>
  useMutation(REMOVE_REACTION_MUTATION, {
    refetchQueries: [
      {
        query: FETCH_POSTS_QUERY,
        variables: {
          limit: ITEMS_PER_PAGE,
          orderByString: "publishedAt",
          reverse: true,
        },
      },
    ],
    ...options,
  });
