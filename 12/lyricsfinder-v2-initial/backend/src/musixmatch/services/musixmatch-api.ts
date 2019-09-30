import * as t from 'io-ts';

export enum MusixMatchApiV1 {
  VERSION = '1.1',
  ARTISTS = 'artist.search',
  SONGS = 'track.search',
  LYRICS = 'track.lyrics.get',
}

export const enum MusixMatchApiV1Params {
  FORMAT = 'format',
  ARTIST = 'q_artist',
  TRACK = 'q_track',
  API_KEY = 'apikey',
  PAGE_SIZE = 'page_size',
  TRACK_ID = 'track_id',
}

export const enum MusixMatchApiV1Formats {
  JSON = 'json',
  JSONP = 'jsonp',
}

export const musixMatchApiV1MessageHeaderValidator = t.type({
  status_code: t.number,
  execute_time: t.number,
});

export const musixMatchApiV1ArtistValidator = t.type({
  artist_id: t.number,
  artist_name: t.string,
  artist_comment: t.string,
  artist_country: t.string,
  artist_rating: t.number,
  artist_twitter_url: t.union([t.string, t.null]),
  restricted: t.number,
  updated_time: t.string,
});

export const musixMatchApiV1ArtistListValidator = t.array(
  t.type({ artist: musixMatchApiV1ArtistValidator }),
);

export const musixMatchApiV1ArtistMessageValidator = t.type({
  message: t.type({
    header: musixMatchApiV1MessageHeaderValidator,
    body: t.type({
      artist_list: musixMatchApiV1ArtistListValidator,
    }),
  }),
});

export const musixMatchApiV1SongGenresValidator = t.type({
  music_genre_list: t.array(
    t.type({
      music_genre: t.type({
        music_genre_id: t.number,
        music_genre_parent_id: t.number,
        music_genre_name: t.string,
        music_genre_name_extended: t.string,
        music_genre_vanity: t.string,
      }),
    }),
  ),
});

export const musixMatchApiV1SongValidator = t.type({
  track_id: t.number,
  artist_id: t.number,
  artist_name: t.string,
  track_name: t.string,
  track_rating: t.number,
  commontrack_id: t.number,
  instrumental: t.number,
  explicit: t.number,
  has_lyrics: t.number,
  has_subtitles: t.number,
  album_id: t.number,
  album_name: t.string,
  track_share_url: t.string,
  restricted: t.number,
  updated_time: t.string,
  primary_genres: musixMatchApiV1SongGenresValidator,
});

export const musixMatchApiV1SongListValidator = t.array(
  t.type({ track: musixMatchApiV1SongValidator }),
);

export const musixMatchApiV1SongMessageValidator = t.type({
  message: t.type({
    header: musixMatchApiV1MessageHeaderValidator,
    body: t.type({
      track_list: musixMatchApiV1SongListValidator,
    }),
  }),
});

export const musixMatchApiV1SongLyricsValidator = t.type({
  lyrics_id: t.number,
  explicit: t.number,
  lyrics_body: t.string,
  script_tracking_url: t.string,
  pixel_tracking_url: t.string,
  lyrics_copyright: t.string,
  updated_time: t.string,
});

export const musixMatchApiV1SongLyricsMessageValidator = t.type({
  message: t.type({
    header: musixMatchApiV1MessageHeaderValidator,
    body: t.type({
      lyrics: musixMatchApiV1SongLyricsValidator,
    }),
  }),
});

// extract the corresponding static types
export interface MusixMatchApiV1ArtistMessage
  extends t.TypeOf<typeof musixMatchApiV1ArtistMessageValidator> {}
export interface MusixMatchApiV1ArtistList
  extends t.TypeOf<typeof musixMatchApiV1ArtistListValidator> {}

export interface MusixMatchApiV1SongMessage
  extends t.TypeOf<typeof musixMatchApiV1SongMessageValidator> {}
export interface MusixMatchApiV1SongList
  extends t.TypeOf<typeof musixMatchApiV1SongListValidator> {}

export interface MusixMatchApiV1SongLyricsMessage
  extends t.TypeOf<typeof musixMatchApiV1SongLyricsMessageValidator> {}
export interface MusixMatchApiV1SongLyrics
  extends t.TypeOf<typeof musixMatchApiV1SongLyricsValidator> {}
