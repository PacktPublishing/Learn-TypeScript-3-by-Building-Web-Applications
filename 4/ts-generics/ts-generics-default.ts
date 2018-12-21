interface InterfaceWithDefaultGenericType<T=string> {
    doSomething(arg: T): T
}

class ClassWithDefaultGenericType<T=string> {
    constructor(public something: T) {}
}

interface InterfaceWithSpecializedGenericType<T = Person & {age: number}> {
    doSomethingElse(arg: T): T
}