class ColoredCar {
    private _color: string;
    private static DEFAULT_COLOR = "Red";

    constructor(color: string) {
        this._color = color;
    }

    displayColor() {
        console.log("Color of this car: ", this.color);
    }

    public get color(): string {
        return this._color;
    }

    public set color(color: string) {
        this._color = color
    }

    private resetColor() {
        this._color = ColoredCar.DEFAULT_COLOR;
    }
}
