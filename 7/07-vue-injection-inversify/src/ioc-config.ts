import 'reflect-metadata';

import {Container} from 'inversify';
import {Driver} from '@/domain/driver';
import {CalmDriver} from '@/domain/calm-driver';
import {LoudCar} from '@/domain/loud-car';
import {Car} from '@/domain/car';
import {SilentCar} from '@/domain/silent-car';
import {TYPES} from '@/ioc-types';
import {TAGS} from '@/ioc-tags';

export const container = new Container();

// configuration of our container
container.bind<Driver>(TYPES.DRIVER).to(CalmDriver);
container.bind<Car>(TYPES.CAR).to(LoudCar).whenTargetTagged(TAGS.CRAZY, true); // crazy drivers drive loud cars
container.bind<Car>(TYPES.CAR).to(SilentCar).whenTargetTagged(TAGS.CRAZY, false); // calm drivers drive silent cars
