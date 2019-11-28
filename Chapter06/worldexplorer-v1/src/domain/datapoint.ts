export class DataPoint {
    constructor(
        private _date: string,
        private _value: number
    ) {

    }

    get date() {
        return this._date;
    }

    get value(): number {
        return this._value;
    }
}
