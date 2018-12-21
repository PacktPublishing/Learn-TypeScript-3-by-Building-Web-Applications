interface Person {
    name: string,
    age: number
}

interface Address {
    street: string,
    streetNumber: number,
    town: string,
    postalCode: number,
    country: string
}

type PersonWithAddress = Person & Address;

function displayPerson(person: PersonWithAddress) {
    console.log(`${person.name} lives in ${person.country}`);
}

let person: PersonWithAddress = {
    name: "Foo",
    age: 42,
    street: "UnknownStreet",
    streetNumber: 1,
    postalCode: 1337,
    town: "UnknownTown",
    country: "Bar"
};

displayPerson(person); // Foo lives in Bar
