import { Module } from '@nestjs/common';
import { SongLyricsResolver } from './song-lyrics.resolver';

@Module({
  imports: [SongLyricsResolver],
})
export class SongLyricsModule {}
