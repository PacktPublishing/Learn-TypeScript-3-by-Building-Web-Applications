import gql from 'graphql-tag';

export const FindArtistsQuery = gql`
  query FindArtists($value: String!) {
    artists(name: $value) {
      id,
      name
    }
  }
`;

export const FindSongsQuery =  gql`
  query FindSongs($value: String!) {
    songs(value: $value) {
      id,
      name,
      hasLyrics
    }
  }
`;

export const FindLyricsQuery = gql`
  query FindLyrics($id: String!) {
    songLyrics(id: $id) {
      lyrics,
      explicit,
      copyright
    }
  }
`;
