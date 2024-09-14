type Image = {
  id: string;
  url: string;
  width?: number | null;
  height?: number | null;
};

type Member = {
  name: string;
  id: string;
  email: string;
  url?: string;
  profilePicture?: Image;
};

type CustomField = {
  key: string;
  value: string;
  relationEntities: any | null;
};

type PostMappingField = {
  key: string;
  type: string;
  value: string;
};

type Reaction = {
  reacted: boolean;
  reaction: string;
  count: number;
  participants: { nodes: Array<{ participant: Member }> };
};

type Space = {
  name: string;
  image: Image;
};

export type Post = {
  __typename: "Post";
  id: string;
  slug: string;
  mappingFields: PostMappingField[];
  fields: CustomField[];
  subscribersCount: number;
  postTypeId: string;
  reactionsCount: number;
  hasMoreContent: boolean;
  isAnonymous: boolean;
  isHidden: boolean;
  shortContent: string;
  createdAt: string;
  publishedAt: string;
  ownerId: string;
  createdById: string;
  status: string;
  spaceId: string;
  imageIds: string[];
  reactions: Array<Reaction>;
  pinnedInto: any[];
  repliesCount: number;
  totalRepliesCount: number;
  locked: boolean;
  repliedToIds: string[];
  repliedToId: string | null;
  title: string;
  description: string;
  thumbnail: Image | null;
  embedIds: any[];
  mentionedMembers: any[];
  primaryReactionType: string;
  lastActivityAt: string;
  language: string;
  relativeUrl: string;
  url: string;
  attachments: any[];
  tags: Array<{ title: string }>;
  space: Space;
  owner: {
    __typename: "SpaceMember";
    member: Member;
  };
};

/**
 * Enum representing the different types of reactions available.
 */
export enum ReactionType {
  Upvote = "upvote",
  PlusOne = "+1",
  Heart = "heart",
  Tada = "tada",
  Smile = "smile",
  OpenMouth = "open_mouth",
  Fire = "Ffire",
  Like = "like",
  Wow = "wow",
}

/**
 * Represents the allowed reactions for different post types.
 */
export type PostTypeAllowedReactionsMap = {
  [postId: string]: null | Array<ReactionType>;
};
