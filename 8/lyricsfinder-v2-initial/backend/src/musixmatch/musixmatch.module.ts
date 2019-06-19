import { Global, Module } from '@nestjs/common';
import axios from 'axios';
import { MusicServiceImpl } from './services';
import { TYPES } from './ioc/types';

@Global()
@Module({
  providers: [
    {
      provide: TYPES.MUSIXMATCH_BASE_URL,
      useValue: 'https://api.musixmatch.com/ws/',
    },
    {
      provide: TYPES.AXIOS_INSTANCE,
      useValue: axios,
    },
    {
      provide: TYPES.MUSIC_SERVICE,
      useClass: MusicServiceImpl,
    },
  ],
  exports: [TYPES.MUSIC_SERVICE],
})
export class MusixmatchModule {}
