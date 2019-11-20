import {Container} from 'inversify';
import {TYPES} from '@/ioc/types';
import {MusicService, MusicServiceImpl} from '@/services';
import getDecorators from 'inversify-inject-decorators';
import {AxiosInstance} from 'axios';
import axios from 'axios';

export const container = new Container();

// configuration of our container
container.bind<string>(TYPES.MUSIXMATCH_BASE_URL).toConstantValue('https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/');
container.bind<AxiosInstance>(TYPES.AXIOS_INSTANCE).toConstantValue(axios);
container.bind<MusicService>(TYPES.MUSIC_SERVICE).to(MusicServiceImpl);

export const { lazyInject } = getDecorators(container);
