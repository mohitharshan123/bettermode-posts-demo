import { ApolloCache } from "@apollo/client";

export class CacheUpdater {
  static addReactionToCache(cache: ApolloCache<any>, data: any, reaction: any) {
    const { addReaction } = data;
    if (!addReaction) return;

    const postId = reaction?.variables?.postId;
    const reactionString = reaction?.variables?.input?.reaction;

    cache.modify({
      id: cache.identify({ id: postId, __typename: "Post" }),
      fields: {
        reactions(existingReactions = []) {
          const updatedReactions = existingReactions.map(
            (r: { reaction: string; count: number }) =>
              r.reaction !== reactionString
                ? { ...r, reaction: reactionString, count: r.count + 1 }
                : r
          );

          return updatedReactions;
        },
      },
    });
  }
}
