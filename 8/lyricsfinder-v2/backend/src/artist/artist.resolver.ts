import { Query, Resolver, Args } from '@nestjs/graphql';
import { TYPES } from '../musixmatch/ioc/types';
import { MusicService } from '../musixmatch/services';
import { ArtistDto } from './artist.dto';
import { Inject } from '@nestjs/common';

@Resolver('Artist')
export class ArtistResolver {
  constructor(
    @Inject(TYPES.MUSIC_SERVICE)
    private readonly musicService: MusicService,
  ) {}

  @Query(() => [ArtistDto])
  async artists(@Args('name') name: string): Promise<ArtistDto[]> {
    return this.musicService.findArtists(name).toPromise();
  }
}
