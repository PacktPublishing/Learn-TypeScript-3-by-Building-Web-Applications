type Nullable<T> = {
    [P in keyof T]: T[P] | null
};

interface Thing {
    name: string
}

const thing: Thing = {
    name: "The thing"
};

const thingName = thing.name;


const nullableThing: Nullable<Thing> = {
    name: "The thing"
};

const nullableThingName: string | null = nullableThing.name;
