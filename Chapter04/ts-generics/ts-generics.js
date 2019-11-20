"use strict";
var persons = [];
// <1> add a single person
persons.push(new Person("John", "Doe"));
// <2> add multiple persons
persons.push(new Person("John", "McClane"), new Person("John", "Smith"), new Person("John", "Dunbar"));
// <3> retrieve a single person
var person = persons.pop();
// <4> loop over all entries
persons.forEach(function (person) {
    console.log("Hello " + person.firstName + " " + person.lastName);
});
// <5> classic for loop over all entries
for (var person_1, i = 0; i < persons.length; i++) {
    person_1 = persons[i];
    console.log("Hello " + person_1.firstName + " " + person_1.lastName);
}
