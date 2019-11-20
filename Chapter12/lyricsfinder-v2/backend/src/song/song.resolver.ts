import { Args, Query, Resolver } from '@nestjs/graphql';
import { MusicService } from '../musixmatch/services';
import { Inject } from '@nestjs/common';
import { TYPES } from '../musixmatch/ioc/types';
import { SongDto } from './song.dto';
import { Observable } from 'rxjs';

@Resolver('Song')
export class SongResolver {
  constructor(
    @Inject(TYPES.MUSIC_SERVICE)
    private readonly musicService: MusicService,
  ) {}

  @Query(() => [SongDto])
  songs(@Args('value') value: string): Observable<SongDto[]> {
    return this.musicService.findSongs(value);
  }
}
