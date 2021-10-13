import gql from 'graphql-tag';

export const GET_TAGS = gql`
  query {
    tags {
      id
      name
      description
    }
  }
`;
