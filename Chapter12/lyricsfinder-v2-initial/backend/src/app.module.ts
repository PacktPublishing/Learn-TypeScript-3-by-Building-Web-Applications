import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusixmatchModule } from './musixmatch/musixmatch.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    MusixmatchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
