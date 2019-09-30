import {Car} from './car';
import {injectable} from 'inversify';

@injectable()
export class SilentCar implements Car {
    private static _type: string = 'silent car';

    public constructor() {
        console.log('Silent car created.');
    }

    public makeNoise(): void {
        console.log('[picture a Tesla in your mind]');
    }

    public get type(): string {
        return SilentCar._type;
    }
}
