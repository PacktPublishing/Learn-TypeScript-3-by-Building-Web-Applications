export class SongLyrics {
  constructor(
      private readonly _id: string,
      private readonly _lyrics: string,
      private readonly _explicit: boolean,
      private readonly _copyright: string,
  ) {
    if (!_id || _id.trim() === '') {
      throw new Error('Invalid song lyrics id');
    }

    if (!_lyrics) {
      this._lyrics = '';
    } else {
      this._lyrics = _lyrics;
    }
  }

  get id(): string {
    return this._id;
  }

  get lyrics(): string {
    return this._lyrics;
  }

  get explicit(): boolean {
    return this._explicit;
  }

  get copyright(): string {
    return this._copyright;
  }
}
