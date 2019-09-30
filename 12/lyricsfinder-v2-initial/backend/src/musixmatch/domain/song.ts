export class Song {
  constructor(
    private _id: string,
    private _artistId: string,
    private _name: string,
    private _hasLyrics: boolean,
    private _genres: string[],
  ) {
    if (!_id || _id.trim() === '') {
      throw new Error('Invalid song id');
    }

    if (!_artistId || _artistId.trim() === '') {
      throw new Error('Invalid song artist id');
    }

    if (!_name || _name.trim() === '') {
      throw new Error('Invalid song name');
    }

    if (!_genres || !Array.isArray(_genres)) {
      throw new Error('Invalid song genres list');
    }
  }

  get id(): string {
    return this._id;
  }

  get artistId(): string {
    return this._artistId;
  }

  get name(): string {
    return this._name;
  }

  get hasLyrics(): boolean {
    return this._hasLyrics;
  }

  get genres(): string[] {
    return this._genres;
  }
}
