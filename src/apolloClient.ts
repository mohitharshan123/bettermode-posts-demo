import { createHttpLink, ApolloLink } from "@apollo/client/index.js";
import { ApolloClient, InMemoryCache } from "@apollo/client-react-streaming";

import { setContext } from "@apollo/client/link/context";
import { BASE_URL, GLOBAL_BASE_URL, JWT_TOKEN } from "./constants/index.ts";

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
      authorization: `Bearer ${JWT_TOKEN}`,
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
    cache: new InMemoryCache(),
  });
