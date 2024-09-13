import { gql } from "@apollo/client/index.js";

export const FETCH_POSTS_QUERY = gql`
  query GetPosts(
    $after: String
    $before: String
    $excludePins: Boolean
    $filterBy: [PostListFilterByInput!]
    $limit: Int!
    $offset: Int
    $orderBy: PostListOrderByEnum
    $orderByString: String
    $postTypeIds: [String!]
    $reverse: Boolean
    $spaceIds: [ID!]
    $query: String
  ) {
    posts(
      after: $after
      before: $before
      excludePins: $excludePins
      filterBy: $filterBy
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      orderByString: $orderByString
      postTypeIds: $postTypeIds
      reverse: $reverse
      spaceIds: $spaceIds
      query: $query
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        slug
        fields {
          key
          value
        }
        postTypeId
        reactionsCount
        hasMoreContent
        isAnonymous
        isHidden
        shortContent
        createdAt
        publishedAt
        ownerId
        createdById
        status
        spaceId
        imageIds
        pinnedInto
        repliesCount
        totalRepliesCount
        locked
        repliedToIds
        repliedToId
        title
        description
        embedIds
        mentionedMembers
        primaryReactionType
        lastActivityAt
        language
        relativeUrl
        url
        owner {
          __typename
          member {
            displayName
            name
            id
            locale
            profilePictureId
            username
            email
            emailStatus
            newEmail
            tagline
            profilePicture {
              ... on Image {
                __typename
                id
                url
              }
            }
          }
        }
        reactions {
          count
          reacted
          reaction
          participants(limit: 10) {
            nodes {
              participant {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_POST_QUERY = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      slug
      mappingFields {
        key
        type
        value
      }
      fields {
        key
        value
        relationEntities {
          __typename
          medias {
            __typename
            ... on Emoji {
              __typename
              id
              text
            }
            ... on File {
              __typename
              downloadUrl
              extension
              id
              name
              size
              url
            }
            ... on Image {
              __typename
              cropHeight
              cropWidth
              cropX
              cropY
              cropZoom
              dominantColorHex
              downloadUrl
              dpi
              height
              id
              name
              url
              urls {
                __typename
                full
                large
                medium
                small
                thumb
              }
              width
            }
          }
          members {
            __typename
            bannerId
            blockedMemberIds
            createdAt
            displayName
            email
            emailStatus
            externalId
            externalUrl
            flagged
            id
            lastSeen
            lastSeenAt
            locale
            name
            networkId
            newEmail
            overrideTeammate
            profilePicture {
              __typename
              ... on Image {
                __typename
                cropHeight
                cropWidth
                cropX
                cropY
                cropZoom
                dominantColorHex
                downloadUrl
                dpi
                height
                id
                name
                url
                urls {
                  __typename
                  full
                  large
                  medium
                  small
                  thumb
                }
                width
              }
            }
            profilePictureId
            relativeUrl
            roleId
            score
            staffReasons
            status
            subscribersCount
            tagline
            teammate
            updatedAt
            url
            username
            verifiedAt
          }
          posts {
            __typename
            allowedEmojis
            allowedReactions
            attachmentIds
            createdAt
            createdById
            description
            embedIds
            externalId
            externalUrl
            followersCount
            forbiddenEmojis
            forbiddenReactions
            hasMoreContent
            id
            imageIds
            isAnonymous
            isHidden
            language
            lastActivityAt
            locked
            mentionedMembers
            negativeReactions
            negativeReactionsCount
            networkId
            ownerId
            pinnedInto
            positiveReactions
            positiveReactionsCount
            postTypeId
            primaryReactionType
            publishedAt
            reactionsCount
            relativeUrl
            repliedToId
            repliedToIds
            repliesCount
            shortContent
            singleChoiceReactions
            slug
            spaceId
            status
            subscribersCount
            tagIds
            textContent
            thumbnailId
            title
            topicIds
            totalRepliesCount
            updatedAt
            url
          }
          spaces {
            __typename
            bannerId
            createdAt
            createdById
            customOrderingIndexInGroup
            description
            externalId
            externalUrl
            groupId
            hidden
            highlightedTagIds
            id
            image {
              __typename
              ... on Emoji {
                __typename
                id
                text
              }
              ... on Image {
                __typename
                cropHeight
                cropWidth
                cropX
                cropY
                cropZoom
                dominantColorHex
                downloadUrl
                dpi
                height
                id
                name
                url
                urls {
                  __typename
                  full
                  large
                  medium
                  small
                  thumb
                }
                width
              }
            }
            imageId
            inviteOnly
            isHomepage
            isNewUserHomepage
            isReturningUserHomepage
            key
            layout
            membersCount
            name
            networkId
            nonAdminsCanInvite
            postsCount
            private
            relativeUrl
            slug
            subscribersCount
            type
            updatedAt
            url
            whoCanPost
            whoCanReact
            whoCanReply
          }
          tags {
            __typename
            description
            id
            slug
            spaceId
            title
          }
        }
      }
      subscribersCount
      postTypeId
      reactionsCount
      hasMoreContent
      isAnonymous
      isHidden
      shortContent
      createdAt
      publishedAt
      ownerId
      createdById
      status
      spaceId
      imageIds
      pinnedInto
      repliesCount
      totalRepliesCount
      locked
      repliedToIds
      repliedToId
      title
      description
      shortcuts {
        __typename
        appId
        description
        favicon {
          __typename
          ... on Emoji {
            __typename
            id
            text
          }
          ... on File {
            __typename
            downloadUrl
            extension
            id
            name
            size
            url
          }
          ... on Glyph {
            __typename
            id
            text
            variant
          }
          ... on Image {
            __typename
            cropHeight
            cropWidth
            cropX
            cropY
            cropZoom
            dominantColorHex
            downloadUrl
            dpi
            height
            id
            name
            url
            width
          }
        }
        faviconId
        key
        name
      }
      embedIds
      mentionedMembers
      primaryReactionType
      lastActivityAt
      language
      customSeoDetail {
        description
        noIndex
        thumbnail {
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
        thumbnailId
        title
        canonicalUrl
      }
      relativeUrl
      url
    }
  }
`;
