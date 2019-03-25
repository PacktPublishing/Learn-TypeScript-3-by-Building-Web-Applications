import { fromEvent } from 'rxjs';

const myClicksObservable = fromEvent(document, 'click');

// ...