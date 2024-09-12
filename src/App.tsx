import { Suspense } from "react";
import "./App.css";
import { WrappedApolloProvider } from "./Transport";
import apolloClient from "./apolloClient";
import { Router } from "./router";

const App = () => {
  return (
    <>
      <WrappedApolloProvider makeClient={apolloClient}>
        <Suspense>
          <Router />
        </Suspense>
      </WrappedApolloProvider>
    </>
  );
};

export default App;
