import { from } from 'rxjs';

const myObservable1 = from([1,2,3]);
const myObservable2 = from(new Promise(resolveFn => resolveFn('Foo')));

// ...