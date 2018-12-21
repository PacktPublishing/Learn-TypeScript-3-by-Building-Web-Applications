enum TShirtType {
    CrewNeck = "Crew Neck", // must be initialized with a constant
    VNeck = "V Neck",
    Henley = "Henley",
    Polo = "Polo",
    SpecialPolo = Polo, // may be initialized with another entry
    ScoopNeck = "Scoop Neck"
}

let myTShirtType = TShirtType.CrewNeck;

console.log("My T-Shirt type: ", myTShirtType);