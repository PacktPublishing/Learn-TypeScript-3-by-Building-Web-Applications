import { MusicService } from './music-service.intf';
import { MusicServiceImpl } from './music-service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/* tslint:disable:max-line-length */

describe('music service', () => {
  let sut: MusicService = (null as unknown) as MusicService;
  const axiosMock: MockAdapter = new MockAdapter(axios, {
    // pass options here if needed
  });

  beforeEach(() => {
    // https://github.com/ctimmerm/axios-mock-adapter
    axiosMock.reset();

    sut = new MusicServiceImpl('https://foo', axios);
  });

  describe('initialization', () => {
    it('should succeed if the URL is provided and valid', () => {
      expect(new MusicServiceImpl('https://foo', axios)).toBeInstanceOf(
        MusicServiceImpl,
      );
      expect(new MusicServiceImpl('https://foo/', axios)).toBeInstanceOf(
        MusicServiceImpl,
      );
      expect(new MusicServiceImpl('http://foo', axios)).toBeInstanceOf(
        MusicServiceImpl,
      );
      expect(new MusicServiceImpl('http://foo/', axios)).toBeInstanceOf(
        MusicServiceImpl,
      );
      expect(new MusicServiceImpl('HTTP://foo/', axios)).toBeInstanceOf(
        MusicServiceImpl,
      );
      expect(new MusicServiceImpl('HTTPS://foo/', axios)).toBeInstanceOf(
        MusicServiceImpl,
      );
    });
  });

  describe('findArtists', () => {
    it('should refuse to find artists if an empty name is given', () => {
      expect(() => {
        sut.findArtists('');
      }).toThrow();
    });

    it('should fail if no artist response is received', (done: () => {}) => {
      axiosMock.onGet().timeout();

      sut.findArtists('Coldplay').subscribe({
        next: () => {
          fail('Should not be called');
          done();
        },
        error: err => {
          expect(err).toBeTruthy();
          done();
        },
        complete: () => {
          fail('Should not be called');
          done();
        },
      });
    });

    it('should return an empty artists array if empty artist resultset', (done: () => {}) => {
      axiosMock.onGet().reply(200, {
        message: {
          header: {
            status_code: 200,
            execute_time: 0.11113905906677,
            available: 0,
          },
          body: { artist_list: [] },
        },
      });

      sut.findArtists('Coldplay').subscribe({
        next: data => {
          expect(data).toBeTruthy();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(0);
          done();
        },
        error: () => {
          fail('There should be no error');
          done();
        },
      });
    });

    it('should return artists when resultset is not empty', (done: () => {}) => {
      axiosMock.onGet().reply(200, {
        message: {
          header: {
            status_code: 200,
            execute_time: 0.05787992477417,
            available: 137,
          },
          body: {
            artist_list: [
              {
                artist: {
                  artist_id: 1039,
                  artist_name: 'Coldplay',
                  artist_name_translation_list: [
                    {
                      artist_name_translation: {
                        language: 'JA',
                        translation:
                          '\u30b3\u30fc\u30eb\u30c9\u30d7\u30ec\u30a4',
                      },
                    },
                  ],
                  artist_comment: '',
                  artist_country: 'GB',
                  artist_alias_list: [
                    {
                      artist_alias:
                        '\u30b3\u30fc\u30eb\u30c9\u30d7\u30ec\u30a4',
                    },
                    { artist_alias: 'ku wan yue dui' },
                    { artist_alias: 'The Coldplay' },
                    { artist_alias: 'Cold Play' },
                  ],
                  artist_rating: 94,
                  artist_twitter_url: 'https://twitter.com/coldplay',
                  artist_credits: { artist_list: [] },
                  restricted: 0,
                  updated_time: '2013-11-05T11:24:57Z',
                },
              },
            ],
          },
        },
      });

      sut.findArtists('Coldplay').subscribe({
        next: data => {
          expect(data).toBeTruthy();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(1);
          done();
        },
        error: () => {
          fail('Error should not be called');
          done();
        },
      });
    });
  });

  describe('findSongs', () => {
    it('should refuse to find songs if an empty name is given', () => {
      expect(() => {
        sut.findSongs('');
      }).toThrow();
    });

    it('should return an empty songs array if empty song resultset', (done: () => {}) => {
      axiosMock.onGet().reply(200, {
        message: {
          header: {
            status_code: 200,
            execute_time: 0.021046876907349,
            available: 0,
          },
          body: { track_list: [] },
        },
      });

      sut.findSongs('Coldplay').subscribe({
        next: data => {
          expect(data).toBeTruthy();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(0);
          done();
        },
        error: () => {
          fail('Error should not be called');
          done();
        },
        complete: () => {
          done();
        },
      });
    });

    it('should return songs when resultset is not empty', (done: () => {}) => {
      axiosMock.onGet().reply(200, {
        message: {
          header: {
            status_code: 200,
            execute_time: 0.058778047561646,
            available: 4,
          },
          body: {
            track_list: [
              {
                track: {
                  track_id: 69783725,
                  track_name: 'Viva La Vida Loca',
                  track_name_translation_list: [],
                  track_rating: 4,
                  commontrack_id: 37865180,
                  instrumental: 0,
                  explicit: 0,
                  has_lyrics: 0,
                  has_subtitles: 0,
                  has_richsync: 0,
                  num_favourite: 0,
                  album_id: 19200669,
                  album_name: 'Goleador Story',
                  artist_id: 24468403,
                  artist_name: 'Guarana Goal',
                  track_share_url:
                    'https://www.musixmatch.com/lyrics/Guarana-Goal/Viva-La-Vida-Loca?utm_source=application&utm_campaign=api&utm_medium=undefined%3A1409618355445',
                  track_edit_url:
                    'https://www.musixmatch.com/lyrics/Guarana-Goal/Viva-La-Vida-Loca/edit?utm_source=application&utm_campaign=api&utm_medium=undefined%3A1409618355445',
                  restricted: 0,
                  updated_time: '2014-03-13T16:17:28Z',
                  primary_genres: {
                    music_genre_list: [
                      {
                        music_genre: {
                          music_genre_id: 12,
                          music_genre_parent_id: 34,
                          music_genre_name: 'Latin',
                          music_genre_name_extended: 'Latin',
                          music_genre_vanity: 'Latin',
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      });

      sut.findSongs('Viva la vida loca').subscribe({
        next: data => {
          expect(data).toBeTruthy();
          expect(Array.isArray(data)).toBe(true);
          expect(data.length).toBe(1);
          expect(data[0].id).toBe('69783725');
          done();
        },
        error: () => {
          fail('Error should not be called');
          done();
        },
      });
    });
  });

  describe('findLyrics', () => {
    it('should fail if no song is given', () => {
      expect(() => {
        sut.findLyrics((null as unknown) as string);
      }).toThrow();
    });

    it('should fail if no song lyrics response is received', (done: () => {}) => {
      axiosMock.onGet().timeout();

      sut.findLyrics('foo').subscribe({
        next: () => {
          fail('Next should not be called');
          done();
        },
        error: err => {
          expect(err).toBeTruthy();
          done();
        },
        complete: () => {
          fail('Complete should not be called');
          done();
        },
      });
    });

    it('should return lyrics when resultset is not empty', (done: () => {}) => {
      axiosMock.onGet().reply(200, {
        message: {
          header: { status_code: 200, execute_time: 0.0089390277862549 },
          body: {
            lyrics: {
              lyrics_id: 1665915,
              explicit: 1,
              lyrics_body: 'Sometimes the groove is so hard...',
              script_tracking_url: 'https://tracking.musixmatch.com/t1',
              pixel_tracking_url: 'https://tracking.musixmatch.com/t1',
              lyrics_copyright:
                'Lyrics powered by www.musixmatch.com. This Lyrics is NOT for Commercial use and only 30% of the lyrics are returned.',
              updated_time: '2017-07-25T13:40:51Z',
            },
          },
        },
      });

      sut.findLyrics('foo').subscribe({
        next: data => {
          expect(data).toBeTruthy();
          expect(data.id).toBe('1665915');
          done();
        },
        error: err => {
          console.log(err);
          fail('Error should not be called');
          done();
        },
      });
    });
  });
});
