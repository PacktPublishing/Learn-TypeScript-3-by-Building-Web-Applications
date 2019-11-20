function displayPerson(person) {
    console.log(person.name + " lives in " + person.country);
}
var person = {
    name: "Foo",
    age: 42,
    street: "UnknownStreet",
    streetNumber: 1,
    postalCode: 1337,
    town: "UnknownTown",
    country: "Bar"
};
displayPerson(person); // Foo lives in Bar
