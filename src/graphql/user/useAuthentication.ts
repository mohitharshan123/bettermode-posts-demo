import { MutationHookOptions, useMutation } from "@apollo/client/index.js";
import { REQUEST_GLOBAL_TOKEN_CODE_MUTATION } from "../posts/mutations";

export const useRequestTokenCode = (options?: MutationHookOptions) =>
  useMutation(REQUEST_GLOBAL_TOKEN_CODE_MUTATION, {
    context: {
      isGlobalOperation: true,
    },
    ...options,
  });
