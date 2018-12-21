"use strict";
var entries = [];
entries.push(new Dog("Pluto", "Bloodhound"));
entries.push(new Person("John", "Doe"));
for (var entry = void 0, i = 0; i < entries.length; i++) {
    entry = entries[i];
    console.log(entry);
}
