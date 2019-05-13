import {Driver} from './driver';
import {inject, injectable, tagged} from 'inversify';
import {Car} from './car';
import {TYPES} from '@/ioc-types';
import {TAGS} from '@/ioc-tags';

@injectable()
export class CalmDriver implements Driver {

    public constructor(
        @inject(TYPES.CAR)
        @tagged(TAGS.CRAZY, false)
        private _car: Car,
    ) {
        console.log('Calm driver instance created');
    }

    public get car(): Car {
        return this._car;
    }

    public get description(): string {
        return `I'm a calm guy driving a ${this._car.type}`;
    }
}
