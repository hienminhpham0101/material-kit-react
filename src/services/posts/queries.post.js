import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      slug
      voteUp
      image
      voteDown
      viewCount
      ownerUserId {
        username
      }
      categoryId {
        name
      }
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $content: String!
    $categoryId: Int!
    $image: String!
    $slug: String!
    $tagId: Int!
    $title: String!
  ) {
    createPost(
      content: $content
      categoryId: $categoryId
      image: $image
      slug: $slug
      tagId: $tagId
      title: $title
    ) {
      title
    }
  }
`;

export const DELETE_POSTS = gql`
  mutation deletePost($ids: [ID]) {
    deletePost(ids: $ids) {
      title
    }
  }
`;

export const GET_POST_BY_ID = gql`
  mutation getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      content
      categoryId {
        id
        name
      }
      image
      slug
      tagId {
        id
        name
      }
    }
  }
`;
