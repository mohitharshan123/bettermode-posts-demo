type MediaUrls = {
  full: string;
  large: string;
  medium: string;
  small: string;
  thumb: string;
};

type Image = {
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  dominantColorHex: string | null;
  dpi: number | null;
  cropHeight: number | null;
  cropWidth: number | null;
  cropX: number | null;
  cropY: number | null;
  cropZoom: number | null;
  urls: MediaUrls;
};

type Member = {
  displayName: string | null;
  name: string;
  id: string;
  locale: string;
  profilePictureId: string;
  bannerId: string | null;
  status: string;
  username: string;
  email: string;
  emailStatus: string;
  newEmail: string | null;
  tagline: string | null;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
  relativeUrl: string;
  url: string;
  externalId: string | null;
  roleId: string;
  flagged: boolean;
  teammate: boolean;
  staffReasons: string[];
  profilePicture: Image;
  badges: any[];
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
  reactions: Array<{ reacted: boolean; reaction: string }>;
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
  customSeoDetail: {
    __typename: "CustomSeoDetail";
    description: string | null;
    noIndex: boolean | null;
    thumbnail: Image | null;
    thumbnailId: string | null;
    title: string | null;
    canonicalUrl: string | null;
  };
  relativeUrl: string;
  url: string;
  attachments: any[];
  owner: {
    __typename: "SpaceMember";
    member: Member;
  };
  space: {
    __typename: "Space";
    id: string;
    networkId: string;
    name: string;
    description: string | null;
    slug: string;
    type: string;
    layout: string;
    isHomepage: boolean;
    address: {
      __typename: "SpaceAddress";
      path: string;
      exact: boolean;
      editable: boolean;
    };
    createdById: string;
    groupId: string;
    imageId: string;
    bannerId: string | null;
    membersCount: number;
    createdAt: string;
    updatedAt: string;
    private: boolean;
    hidden: boolean;
    inviteOnly: boolean;
    nonAdminsCanInvite: boolean;
    customOrderingIndexInGroup: number;
    whoCanPost: any | null;
    whoCanReact: any | null;
    whoCanReply: any | null;
    customSeoDetail: {
      __typename: "CustomSeoDetail";
      description: string | null;
      noIndex: boolean | null;
      thumbnail: Image | null;
      thumbnailId: string | null;
      title: string | null;
    };
    relativeUrl: string;
    url: string;
    image: Image;
  };
  replies: {
    __typename: "PaginatedPost";
    nodes: any[];
    pageInfo: {
      __typename: "PageInfo";
      endCursor: string | null;
      hasNextPage: boolean;
    };
    totalCount: number;
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
