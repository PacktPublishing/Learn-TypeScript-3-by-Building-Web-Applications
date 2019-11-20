class NaiveMap<Key, Value> {
    private _keys: Key[] = [];
    private _values: Value[] = [];

    constructor(){}

    contains(key: Key): boolean {
        const result = this._keys.indexOf(key);
        return result !== -1;
    }

    put(key: Key, value: Value): void {
        if(!this.contains(key)) {
            this._keys.push(key);
            this._values.push(value);
        }
    }

    get(key: Key): Value | undefined {
        if(this.contains(key)) {
            return this._values[this._keys.indexOf(key)];
        } else{
            return undefined;
        }
    }
}


class Thing {
    constructor(public name: string){}
}

const naiveMap = new NaiveMap<string, Thing>();

naiveMap.put("foo", new Thing("The thing"));
console.log(naiveMap.contains("foo")); // true
console.log(naiveMap.get("foo")); // Thing { name: 'The thing' }
