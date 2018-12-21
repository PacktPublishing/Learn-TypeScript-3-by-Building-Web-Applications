"use strict";
var VehicleType;
(function (VehicleType) {
    VehicleType[VehicleType["Car"] = 0] = "Car";
    VehicleType[VehicleType["Bus"] = 1] = "Bus";
    VehicleType[VehicleType["Train"] = 2] = "Train";
})(VehicleType || (VehicleType = {}));
var myVehicleType = VehicleType.Car;
console.log("My vehicle type: ", myVehicleType);
