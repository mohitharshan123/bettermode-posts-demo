import { ApolloCache } from "@apollo/client/index.js";

type CacheUpdaterParams = {
  cache: ApolloCache<any>;
  data?: any;
  reaction?: any;
  user?: Member;
};

export class CacheUpdater {
  static async addReactionToCache({
    cache,
    data,
    reaction,
    user,
  }: CacheUpdaterParams) {
    if (!data || !data.addReaction) return;

    const postId = reaction?.variables?.postId;
    const reactionString = reaction?.variables?.input?.reaction;

    if (!postId || !reactionString || !user) return;

    cache.modify({
      id: cache.identify({ id: postId, __typename: "Post" }),
      fields: {
        reactions(existingReactions = []) {
          const updatedReactions = CacheUpdater.getUpdatedReactionsForAdd(
            existingReactions,
            reactionString,
            user
          );
          return updatedReactions;
        },
      },
    });
  }

  static async removeReactionFromCache({
    cache,
    reaction,
    user,
  }: CacheUpdaterParams) {
    if (!reaction || !user) return;

    const postId = reaction.variables.postId;

    cache.modify({
      id: cache.identify({ id: postId, __typename: "Post" }),
      fields: {
        reactions(existingReactions = []) {
          const updatedReactions = CacheUpdater.getUpdatedReactionsForRemove(
            existingReactions,
            user
          );
          return updatedReactions;
        },
      },
    });
  }

  private static getUpdatedReactionsForAdd(
    existingReactions: any[],
    reactionString: string,
    user: Member
  ) {
    if (!existingReactions.length) {
      return [
        {
          __typename: "PostReactionDetail",
          count: 1,
          reacted: true,
          reaction: reactionString,
          'participants({"limit":10})': {
            __typename: "PaginatedPostReactionParticipant",
            nodes: [
              {
                __typename: "PostReactionParticipant",
                participant: {
                  id: user.id,
                  name: user.name,
                  __typename: "Member",
                },
              },
            ],
          },
        },
      ];
    }

    return existingReactions.map((r: { reaction: string; count: number }) =>
      r.reaction !== reactionString
        ? { ...r, reaction: reactionString, count: r.count + 1 }
        : r
    );
  }

  private static getUpdatedReactionsForRemove(
    existingReactions: any[],
    user: Member
  ) {
    return existingReactions.filter((reaction: any) => {
      const participantsField = reaction['participants({"limit":10})'] || {
        nodes: [],
      };
      const hasUserParticipant = participantsField.nodes.some(
        (node: any) =>
          node.participant.id === user.id ||
          node.participant.__ref === `Member:${user.id}`
      );

      return !hasUserParticipant;
    });
  }
}
