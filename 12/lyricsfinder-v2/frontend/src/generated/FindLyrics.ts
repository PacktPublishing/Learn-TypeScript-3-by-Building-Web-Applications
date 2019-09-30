/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindLyrics
// ====================================================

export interface FindLyrics_songLyrics {
  __typename: "SongLyricsDto";
  lyrics: string;
  explicit: boolean;
  copyright: string;
}

export interface FindLyrics {
  songLyrics: FindLyrics_songLyrics;
}

export interface FindLyricsVariables {
  id: string;
}
