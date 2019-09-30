import { Module } from '@nestjs/common';
import { SongResolver } from './song.resolver';

@Module({
  providers: [SongResolver]
})
export class SongModule {}
