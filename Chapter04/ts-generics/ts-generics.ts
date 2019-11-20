let persons: Array<Person> = [];

// <1> add a single person
persons.push(new Person("John", "Doe"));

// <2> add multiple persons
persons.push(
    new Person("John", "McClane"),
    new Person("John", "Smith"),
    new Person("John", "Dunbar")
);

// <3> retrieve a single person
const person:Person = persons.pop() as NonNullable<Person>;

// <4> loop over all entries
persons.forEach(person => {
   console.log(`Hello ${person.firstName} ${person.lastName}`);
});

// <5> classic for loop over all entries
for(let person: Person, i:number=0; i < persons.length; i++) {
    person = persons[i];
    console.log(`Hello ${person.firstName} ${person.lastName}`);
}
