import { Subject } from 'rxjs';

const observer1 = {
    next: (value: string) => console.log(`Observer 1: ${value}`)
};

const observer2 = {
    next: (value: string) => console.log(`Observer 1: ${value}`)
};

const mySubject = new Subject<string>();

mySubject.subscribe(observer1);
mySubject.subscribe(observer2);

mySubject.next("Hello");
mySubject.next("World");

// Output:
// Observer 1: Hello
// Observer 2: Hello
// Observer 1: World
// Observer 2: World