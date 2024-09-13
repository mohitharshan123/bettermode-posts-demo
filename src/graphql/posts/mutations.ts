import { gql } from "@apollo/client/index.js";

export const REQUEST_GLOBAL_TOKEN_CODE_MUTATION = gql`
  mutation AuthFormRequestGlobalTokenCodeMutation(
    $input: RequestGlobalTokenInput!
  ) {
    requestGlobalTokenCode(input: $input) {
      status
    }
  }
`;

export const ADD_REACTION_MUTATION = gql`
  mutation addReaction($input: AddReactionInput!, $postId: ID!) {
    addReaction(input: $input, postId: $postId) {
      status
    }
  }
`;

export const REMOVE_REACTION_MUTATION = gql`
  mutation removeReaction($reaction: String!, $postId: ID!) {
    removeReaction(reaction: $reaction, postId: $postId) {
      status
    }
  }
`;
