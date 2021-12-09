import gql from 'graphql-tag';

export default gql`
fragment CompanyYoutubeFragment on ContentCompany {
  youtube {
    channelId
    playlistId
    username
  }
}
`;
