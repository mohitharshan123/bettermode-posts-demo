import {
  MutationOptions,
  QueryHookOptions,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@apollo/client/index.js";
import { FETCH_POSTS_QUERY, GET_POST_QUERY } from "./queries";
import { ADD_REACTION_MUTATION, REMOVE_REACTION_MUTATION } from "./mutations";

export const useFetchPosts = (options?: QueryHookOptions) =>
  useSuspenseQuery(FETCH_POSTS_QUERY, {
    variables: {
      limit: 10,
      orderByString: "publishedAt",
      reverse: true,
    },
    ...options,
  });

export const useGetPost = (
  id: string | undefined,
  options?: QueryHookOptions
) =>
  useSuspenseQuery(GET_POST_QUERY, {
    variables: {
      id,
    },
    ...options,
  });

export const useReaction = (options?: MutationOptions) =>
  useMutation(ADD_REACTION_MUTATION, {
    refetchQueries: [
      {
        query: FETCH_POSTS_QUERY,
        variables: {
          limit: 50,
          orderByString: "publishedAt",
          reverse: true,
        },
      },
    ],
    ...options,
  });

export const useRemoveReaction = (options?: MutationOptions) =>
  useMutation(REMOVE_REACTION_MUTATION, {
    refetchQueries: [
      {
        query: FETCH_POSTS_QUERY,
        variables: {
          limit: 50,
          orderByString: "publishedAt",
          reverse: true,
        },
      },
    ],
    ...options,
  });
