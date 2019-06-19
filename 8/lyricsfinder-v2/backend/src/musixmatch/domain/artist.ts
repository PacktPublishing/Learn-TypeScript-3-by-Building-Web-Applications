export class Artist {
  constructor(
    private _id: string,
    private _name: string,
  ) {
    if (!_id || _id.trim() === '') {
      throw new Error('Invalid artist id');
    }

    if (!_name || _name.trim() === '') {
      throw new Error('Invalid artist name');
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
