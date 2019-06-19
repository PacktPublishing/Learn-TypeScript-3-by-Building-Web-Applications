import { Query, Resolver, Args } from '@nestjs/graphql';
import { SongLyricsDto } from './song-lyrics.dto';
import { MusicService } from '../musixmatch/services';
import { Inject } from '@nestjs/common';
import { TYPES } from '../musixmatch/ioc/types';

@Resolver('SongLyrics')
export class SongLyricsResolver {
  constructor(
    @Inject(TYPES.MUSIC_SERVICE)
    private readonly musicService: MusicService,
  ) {}

  @Query(() => SongLyricsDto)
  songLyrics(@Args('id') id: string) {
    return this.musicService.findLyrics(id);
  }
}
