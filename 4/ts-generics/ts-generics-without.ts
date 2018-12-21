class Animal {
    constructor (public name: string) {}
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }
}

class Person {
    constructor(public firstName: string, public lastName: string){}
}
