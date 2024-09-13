import { useSuspenseQuery } from "@apollo/client/index.js";
import { AUTH_MEMBER_QUERY } from "./queries";

export const useFetchAuthUser = (): any => useSuspenseQuery(AUTH_MEMBER_QUERY);
