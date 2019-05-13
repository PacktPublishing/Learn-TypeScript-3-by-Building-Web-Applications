import {Container} from 'inversify';
import getDecorators from 'inversify-inject-decorators';

export const container = new Container();

// configuration of our container
// container.bind ...

export const { lazyInject } = getDecorators(container);
