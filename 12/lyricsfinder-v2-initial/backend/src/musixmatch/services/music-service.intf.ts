import { Artist, Song, SongLyrics } from '../domain';
import { Observable } from 'rxjs';

export interface MusicService {
  findArtists(name: string): Observable<Artist[]>;
  findSongs(value: string): Observable<Song[]>;
  findLyrics(songId: string): Observable<SongLyrics>;
}
