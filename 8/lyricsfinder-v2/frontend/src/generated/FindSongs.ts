/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindSongs
// ====================================================

export interface FindSongs_songs {
  __typename: "SongDto";
  id: string;
  name: string;
  hasLyrics: boolean;
}

export interface FindSongs {
  songs: FindSongs_songs[];
}

export interface FindSongsVariables {
  value: string;
}
