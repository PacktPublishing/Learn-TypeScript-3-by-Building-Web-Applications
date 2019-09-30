import {Artist, Song} from '@/domain';
import {Observable} from 'rxjs';
import {SongLyrics} from '@/domain/song-lyrics';

export interface MusicService {
    findArtists(name: string): Observable<Artist[]>;
    findSongs(value: string): Observable<Song[]>;
    findLyrics(song: Song): Observable<SongLyrics>;
}
