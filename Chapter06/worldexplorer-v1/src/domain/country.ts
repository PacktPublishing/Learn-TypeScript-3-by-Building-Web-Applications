export class Country {
    constructor(
        private _name: string,
        private _id: string,
        private _iso2Code: string,
        private _capitalCity: string,
        private _longitude: string,
        private _latitude: string
    ) {

    }

    get name() {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get iso2Code(): string {
        return this._iso2Code;
    }

    get capitalCity(): string {
        return this._capitalCity;
    }

    get longitude(): string {
        return this._longitude;
    }

    get latitude(): string {
        return this._latitude;
    }
}
