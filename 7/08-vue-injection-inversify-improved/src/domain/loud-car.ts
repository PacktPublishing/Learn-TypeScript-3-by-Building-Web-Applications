import {Car} from './car';
import {injectable} from 'inversify';

@injectable()
export class LoudCar implements Car {
    private static _type: string = 'loud car';

    public constructor() {
        console.log('Loud car created.');
    }

    public makeNoise(): void {
        console.log('VRRRRRRrrrrrrooooommm');
    }

    public get type(): string {
        return LoudCar._type;
    }
}
