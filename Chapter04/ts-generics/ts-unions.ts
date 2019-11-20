let entries: Array<Person | Animal> = [];

entries.push(new Dog("Pluto", "Bloodhound"));
entries.push(new Person("John", "Doe"));

for(let entry: Person | Animal, i:number=0; i < entries.length; i++) {
    entry = entries[i];
    console.log(entry);
}
