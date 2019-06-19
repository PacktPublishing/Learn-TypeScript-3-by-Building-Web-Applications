import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongLyricsModule } from './song-lyrics/song-lyrics.module';
import { MusixmatchModule } from './musixmatch/musixmatch.module';
import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    SongLyricsModule,
    MusixmatchModule,
    ArtistModule,
    SongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
