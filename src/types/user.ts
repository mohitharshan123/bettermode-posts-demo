type Member = {
  __typename: "Member";
  displayName: string | null;
  name: string;
  id: string;
  locale: string;
  profilePictureId: string;
  bannerId: string | null;
  status: "VERIFIED";
  username: string;
  email: string;
  emailStatus: "verified";
  newEmail: string | null;
  tagline: string | null;
  lastSeenAt: string; // ISO 8601 format
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  relativeUrl: string;
  url: string;
  externalId: string | null;
  roleId: string;
  flagged: boolean;
  teammate: boolean;
  staffReasons: string[];
  role: Role;
  banner: null;
  profilePicture: Image;
  authMemberProps: MemberAuthMemberProps;
  fields: CustomField[];
  settings: MemberSettings;
};

type Role = {
  __typename: "Role";
  id: string;
  name: string;
  type: "admin";
  description: string | null;
  visible: boolean;
};

type Image = {
  __typename: "Image";
  id: string;
  url: string;
  width: number | null;
  height: number | null;
  dominantColorHex: string | null;
  dpi: number | null;
  cropHeight: number | null;
  cropWidth: number | null;
  cropX: number;
  cropY: number;
  cropZoom: number;
  urls: MediaUrls;
};

type MediaUrls = {
  __typename: "MediaUrls";
  full: string;
  large: string;
  medium: string;
  small: string;
  thumb: string;
};

type MemberAuthMemberProps = {
  __typename: "MemberAuthMemberProps";
  context: "MEMBER";
  scopes: string[];
  canSendPrivateMessages: boolean;
  subscribed: boolean;
  permissions: ActionPermissions[];
};

type ActionPermissions = {
  __typename: "ActionPermissions";
  name: string;
  isAuthorized: IsAuthorized;
  inputPermissions: InputPathPermissions[];
  outputPermissions: PathPermissions[];
};

type IsAuthorized = {
  __typename: "IsAuthorized";
  authorized: boolean;
  reason: string | null;
  requiredPlan: string | null;
};

type InputPathPermissions = {
  __typename: "InputPathPermissions";
  path: string;
  isAuthorized: IsAuthorized;
};

type PathPermissions = {
  __typename: "PathPermissions";
  path: string;
  isAuthorized: IsAuthorized;
};

type CustomField = {
  __typename: "CustomField";
  key: string;
  value: string;
};

type MemberSettings = {
  __typename: "MemberSettings";
  privateMessaging: MemberPrivateMessagingSettings;
};

type MemberPrivateMessagingSettings = {
  __typename: "MemberPrivateMessagingSettings";
  privateMessagingEnabled: boolean;
};
