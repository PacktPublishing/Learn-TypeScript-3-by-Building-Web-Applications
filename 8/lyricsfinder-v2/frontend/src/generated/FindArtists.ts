/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FindArtists
// ====================================================

export interface FindArtists_artists {
  __typename: "ArtistDto";
  id: string;
  name: string;
}

export interface FindArtists {
  artists: FindArtists_artists[];
}

export interface FindArtistsVariables {
  value: string;
}
