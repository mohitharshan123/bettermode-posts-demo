import { createHttpLink, ApolloLink } from "@apollo/client/index.js";
import { ApolloClient, InMemoryCache } from "@apollo/client-react-streaming";

import { setContext } from "@apollo/client/link/context";
import { BASE_URL, GLOBAL_BASE_URL } from "./constants/index.ts";

const httpLink = createHttpLink({
  uri: BASE_URL,
});

const globalLink = createHttpLink({
  uri: GLOBAL_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
    },
  };
});

const link = ApolloLink.split(
  (operation) => operation.getContext().isGlobalOperation,
  globalLink,
  authLink.concat(httpLink)
);

export default () =>
  new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: false,
              merge(existing = { nodes: [] }, incoming) {
                return {
                  ...incoming,
                  nodes: [...existing.nodes, ...incoming.nodes],
                };
              },
            },
          },
        },
        Post: {
          keyFields: ["id"],
        },
      },
    }),
  });
