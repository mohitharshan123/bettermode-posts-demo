import { gql } from "@apollo/client/index.js";

export const AUTH_MEMBER_QUERY = gql`
  query AuthMember {
    authMember {
      displayName
      name
      id
      locale
      profilePictureId
      bannerId
      status
      username
      email
      emailStatus
      newEmail
      tagline
      lastSeenAt
      createdAt
      updatedAt
      relativeUrl
      url
      externalId
      roleId
      flagged
      teammate
      staffReasons
      role {
        id
        name
        type
        description
        visible
      }
      banner {
        ... on Image {
          __typename
          id
          url
          width
          height
          dominantColorHex
          dpi
          cropHeight
          cropWidth
          cropX
          cropY
          cropZoom
          urls {
            __typename
            full
            large
            medium
            small
            thumb
          }
        }
        ... on Emoji {
          __typename
          id
          text
        }
        ... on Glyph {
          __typename
          id
          text
          variant
        }
        ... on File {
          id
          name
          url
        }
      }
      profilePicture {
        ... on Image {
          __typename
          id
          url
          width
          height
          dominantColorHex
          dpi
          cropHeight
          cropWidth
          cropX
          cropY
          cropZoom
          urls {
            __typename
            full
            large
            medium
            small
            thumb
          }
        }
        ... on Emoji {
          __typename
          id
          text
        }
        ... on Glyph {
          __typename
          id
          text
          variant
        }
        ... on File {
          id
          name
          url
        }
      }
      authMemberProps {
        context
        scopes
        canSendPrivateMessages
        subscribed
        permissions {
          name
          isAuthorized {
            authorized
            reason
            requiredPlan
          }
          inputPermissions {
            path
            isAuthorized {
              authorized
              reason
              requiredPlan
            }
          }
          outputPermissions {
            path
            isAuthorized {
              authorized
              reason
              requiredPlan
            }
          }
        }
      }
      badges {
        backgroundColor
        badgeId
        imageId
        longDescription
        text
        shortDescription
        textColor
        type
        badge {
          active
          backgroundColor
          daysUntilExpired
          id
          imageId
          longDescription
          name
          shortDescription
          textColor
          text
          type
          settings {
            key
            value
          }
          image {
            ... on Image {
              __typename
              id
              url
              width
              height
              dominantColorHex
              dpi
              cropHeight
              cropWidth
              cropX
              cropY
              cropZoom
              urls {
                __typename
                full
                large
                medium
                small
                thumb
              }
            }
            ... on Emoji {
              __typename
              id
              text
            }
            ... on Glyph {
              __typename
              id
              text
              variant
            }
            ... on File {
              id
              name
              url
            }
          }
        }
      }
      fields {
        key
        value
      }
      extraProperties {
        key
        value
      }
      settings {
        privateMessaging {
          privateMessagingEnabled
        }
      }
    }
  }
`;
