import { MusicService } from './music-service.intf';
import { Observable } from 'rxjs';
import { Artist, Song, SongLyrics } from '../domain';
import { AxiosResponse, AxiosStatic } from 'axios';
import {
  MusixMatchApiV1,
  MusixMatchApiV1ArtistList,
  MusixMatchApiV1ArtistMessage,
  musixMatchApiV1ArtistMessageValidator,
  MusixMatchApiV1Formats,
  MusixMatchApiV1Params,
  MusixMatchApiV1SongList,
  MusixMatchApiV1SongLyrics,
  MusixMatchApiV1SongLyricsMessage,
  musixMatchApiV1SongLyricsMessageValidator,
  MusixMatchApiV1SongMessage,
  musixMatchApiV1SongMessageValidator,
} from './musixmatch-api';
import { map, retry } from 'rxjs/operators';
import { API_KEY } from '../../api-key';
import { observableAxiosGetRequest } from './axios-utils';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { TYPES } from '../ioc/types';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MusicServiceImpl implements MusicService {
  private readonly musixMatchApiBaseUrl: string;

  constructor(
    @Inject(TYPES.MUSIXMATCH_BASE_URL) baseUrl: string,
    @Inject(TYPES.AXIOS_INSTANCE) private axios: AxiosStatic,
  ) {
    if (!baseUrl || baseUrl.trim().length === 0) {
      throw new Error('The base URL must be provided!');
    } else if (
      !baseUrl.toLocaleLowerCase().startsWith('https://') &&
      !baseUrl.toLocaleLowerCase().startsWith('http://')
    ) {
      throw new Error(
        "The URL looks invalid. It should start with 'http://' or https://'",
      );
    }

    let cleanBaseUrl = baseUrl.trim();
    if (cleanBaseUrl.endsWith('/')) {
      cleanBaseUrl = cleanBaseUrl.substr(0, cleanBaseUrl.lastIndexOf('/'));
    }

    this.musixMatchApiBaseUrl = `${cleanBaseUrl}/${MusixMatchApiV1.VERSION}/`;

    console.log(
      `Music service initialized.\nMusixMatch API URL: [${
        this.musixMatchApiBaseUrl
      }]`,
    );
  }

  findArtists(name: string): Observable<Artist[]> {
    if (!name || name.trim() === '') {
      throw new Error('The name is mandatory and cannot be empty');
    }

    const requestURL = `${this.musixMatchApiBaseUrl}${MusixMatchApiV1.ARTISTS}`;
    const requestParams: any = {
      [MusixMatchApiV1Params.API_KEY]: API_KEY,
      [MusixMatchApiV1Params.FORMAT]: MusixMatchApiV1Formats.JSON,
      [MusixMatchApiV1Params.PAGE_SIZE]: 100,
      [MusixMatchApiV1Params.ARTIST]: name,
    };

    // console.log('Request URL: ', requestURL);
    // console.log('Request params: ', requestParams);

    return observableAxiosGetRequest(
      requestURL,
      { params: requestParams },
      this.axios,
    ).pipe(
      retry(3),
      map((axiosResponse: AxiosResponse) => {
        const jsonContent: unknown = axiosResponse.data; // Axios automatically converts to JSON by default

        // console.log(`Response JSON data: ${JSON.stringify(jsonContent)}`);

        const validationResult = musixMatchApiV1ArtistMessageValidator.decode(
          jsonContent,
        );
        if (validationResult.isLeft()) {
          throw PathReporter.report(validationResult).join('\n');
        }

        const validatedResponse = validationResult.value as MusixMatchApiV1ArtistMessage;

        return validatedResponse.message.body.artist_list;
      }),
      map((rawArtistsList: MusixMatchApiV1ArtistList) => {
        // console.log('Raw artists list: ', rawArtistsList);
        const retVal: Artist[] = [];

        rawArtistsList.forEach(artist => {
          retVal.push(
            new Artist(`${artist.artist.artist_id}`, artist.artist.artist_name),
          );
        });

        return retVal;
      }),
    );
  }

  findSongs(name: string): Observable<Song[]> {
    if (!name || name.trim() === '') {
      throw new Error('The name is mandatory and cannot be empty');
    }

    const requestURL = `${this.musixMatchApiBaseUrl}${MusixMatchApiV1.SONGS}`;
    const requestParams: any = {
      [MusixMatchApiV1Params.API_KEY]: API_KEY,
      [MusixMatchApiV1Params.FORMAT]: MusixMatchApiV1Formats.JSON,
      [MusixMatchApiV1Params.PAGE_SIZE]: 100,
      [MusixMatchApiV1Params.TRACK]: name,
    };

    // console.log('Request URL: ', requestURL);
    // console.log('Request params: ', requestParams);

    return observableAxiosGetRequest(
      requestURL,
      { params: requestParams },
      this.axios,
    ).pipe(
      retry(3),
      map((axiosResponse: AxiosResponse) => {
        const jsonContent: unknown = axiosResponse.data; // Axios automatically converts to JSON by default

        // console.log(`Response JSON data: ${JSON.stringify(jsonContent)}`);

        const validationResult = musixMatchApiV1SongMessageValidator.decode(
          jsonContent,
        );
        if (validationResult.isLeft()) {
          throw PathReporter.report(validationResult).join('\n');
        }

        const validatedResponse = validationResult.value as MusixMatchApiV1SongMessage;

        return validatedResponse.message.body.track_list;
      }),
      map((rawSongsList: MusixMatchApiV1SongList) => {
        // console.log('Raw songs list: ', rawSongsList);
        const retVal: Song[] = [];

        rawSongsList.forEach(song => {
          const songGenres: string[] = [];

          song.track.primary_genres.music_genre_list.forEach(genre => {
            songGenres.push(genre.music_genre.music_genre_name);
          });

          retVal.push(
            new Song(
              `${song.track.track_id}`,
              `${song.track.artist_id}`,
              song.track.track_name,
              // small trick to convert to boolean
              !!song.track.has_lyrics,
              songGenres,
            ),
          );
        });

        return retVal;
      }),
    );
  }

  findLyrics(songId: string): Observable<SongLyrics> {
    if (!songId) {
      throw new Error('A song id must be provided to fetch its lyrics');
    }

    const requestURL = `${this.musixMatchApiBaseUrl}${MusixMatchApiV1.LYRICS}`;
    const requestParams: any = {
      [MusixMatchApiV1Params.API_KEY]: API_KEY,
      [MusixMatchApiV1Params.FORMAT]: MusixMatchApiV1Formats.JSON,
      [MusixMatchApiV1Params.PAGE_SIZE]: 100,
      [MusixMatchApiV1Params.TRACK_ID]: songId,
    };

    // console.log('Request URL: ', requestURL);
    // console.log('Request params: ', requestParams);

    return observableAxiosGetRequest(
      requestURL,
      { params: requestParams },
      this.axios,
    ).pipe(
      retry(3),
      map((axiosResponse: AxiosResponse) => {
        const jsonContent: unknown = axiosResponse.data; // Axios automatically converts to JSON by default

        // console.log(`Response JSON data: ${JSON.stringify(jsonContent)}`);

        const validationResult = musixMatchApiV1SongLyricsMessageValidator.decode(
          jsonContent,
        );
        if (validationResult.isLeft()) {
          throw PathReporter.report(validationResult).join('\n');
        }

        const validatedResponse = validationResult.value as MusixMatchApiV1SongLyricsMessage;

        return validatedResponse.message.body.lyrics;
      }),
      map((rawSongLyrics: MusixMatchApiV1SongLyrics) => {
        const retVal: SongLyrics = new SongLyrics(
          `${rawSongLyrics.lyrics_id}`,
          rawSongLyrics.lyrics_body,
          !!rawSongLyrics.explicit,
          rawSongLyrics.lyrics_copyright,
        );

        return retVal;
      }),
    );
  }
}
