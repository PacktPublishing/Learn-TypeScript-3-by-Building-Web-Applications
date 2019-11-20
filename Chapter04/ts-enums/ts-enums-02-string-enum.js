"use strict";
var TShirtType;
(function (TShirtType) {
    TShirtType["CrewNeck"] = "Crew Neck";
    TShirtType["VNeck"] = "V Neck";
    TShirtType["Henley"] = "Henley";
    TShirtType["Polo"] = "Polo";
    TShirtType["SpecialPolo"] = "Polo";
    TShirtType["ScoopNeck"] = "Scoop Neck";
})(TShirtType || (TShirtType = {}));
var myTShirtType = TShirtType.CrewNeck;
console.log("My T-Shirt type: ", myTShirtType);
