abstract class Shape {

    constructor(private readonly _shapeName: string) {
        this._shapeName = "haha";
        this.displayInformation();
    }

    abstract displayArea(): void;
    abstract displayPerimeter(): void;

    protected get shapeName(): string {
        return this._shapeName
    }

    public displayInformation(): void {
        console.log(`This shape is a ${this._shapeName}`);
    }

    public doSomething(): void {
        console.log("Not interesting");
    }
}

class Square extends Shape {

    constructor(private _width: number) {
        super("Square");
    }

    displayArea(): void {
        const area = this._width * this._width;
        console.log(`This ${this.shapeName} has an area of: ${area}`);
    }

    displayPerimeter(): void {
        const perimeter = 2 * (this._width + this._width);
        console.log(`This ${this.shapeName} has a perimeter of : ${perimeter}`)
    }

    public doSomething(): void {
        console.log("Something more interesting");
    }
}
