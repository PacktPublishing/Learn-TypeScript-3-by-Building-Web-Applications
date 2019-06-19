import { Module } from '@nestjs/common';
import { ArtistResolver } from './artist.resolver';

@Module({
  providers: [ArtistResolver]
})
export class ArtistModule {}
