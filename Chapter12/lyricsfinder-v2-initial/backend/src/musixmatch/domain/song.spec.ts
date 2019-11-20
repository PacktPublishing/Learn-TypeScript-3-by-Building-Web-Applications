import {Song} from './song';

/* tslint:disable:no-unused-expression */

describe('song', () => {
  it('should not accept an undefined id', () => {
    expect(() => {
      new Song(null as unknown as string, 'foo', 'bar', true, []);
    }).toThrow();

    expect(() => {
      new Song(undefined as unknown as string, 'foo', 'bar', true, []);
    }).toThrow();
  });

  it('should not accept an empty id', () => {
    expect(() => {
      new Song('', 'foo', 'bar', true, []);
    }).toThrow();

    expect(() => {
      new Song('   ', 'foo', 'bar', true, []);
    }).toThrow();
  });

  it('should not accept an undefined artist id', () => {
    expect(() => {
      new Song('foo', null as unknown as string, 'bar', true, []);
    }).toThrow();

    expect(() => {
      new Song('foo', undefined as unknown as string, 'bar', true, []);
    }).toThrow();
  });

  it('should not accept an empty artist id', () => {
    expect(() => {
      new Song('', 'foo', 'bar', true, []);
    }).toThrow();

    expect(() => {
      new Song('   ', 'foo', 'bar', true, []);
    }).toThrow();
  });

  it('should not accept an undefined name', () => {
    expect(() => {
      new Song('foo', null as unknown as string, 'bar', true, []);
    }).toThrow();

    expect(() => {
      new Song('foo', undefined as unknown as string, 'bar', true, []);
    }).toThrow();
  });

  it('should not accept an empty name', () => {
    expect(() => {
      new Song('foo', '', 'bar', true, []);
    }).toThrow();

    expect(() => {
      new Song('foo', '   ', 'bar', true, []);
    }).toThrow();
  });

  it('should not accept an undefined songs array', () => {
    expect(() => {
      new Song('foo', 'bar', 'baz', true, null as unknown as []);
    }).toThrow();

    expect(() => {
      new Song('foo', 'bar', 'baz', true, undefined as unknown as []);
    }).toThrow();
  });

  it('should not accept something else than an array-like', () => {
    expect(() => {
      new Song('foo', 'bar', 'baz', true, {} as unknown as []);
    }).toThrow();
  });

  it('should create if everything is valid', () => {
    const id = 'fooId';
    const artistId = 'artistId';
    const name = 'fooName';
    const genres = ['a', 'b', 'c'];
    const hasLyrics = true;

    const result = new Song(id, artistId, name, hasLyrics, genres);

    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Song);
    expect(result.id).toBe(id);
    expect(result.artistId).toBe(artistId);
    expect(result.name).toBe(name);
    expect(result.hasLyrics).toBe(hasLyrics);
    expect(result.genres).toBe(genres);
  });

  it('should create if the genres list is empty', () => {
    const id = 'fooId';
    const artistId = 'fooArtistId';
    const name = 'fooName';
    const genres: string[] = [];
    const hasLyrics = true;

    const result = new Song(id, artistId, name, hasLyrics, genres);

    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Song);
    expect(result.id).toBe(id);
    expect(result.artistId).toBe(artistId);
    expect(result.name).toBe(name);
    expect(result.hasLyrics).toBe(hasLyrics);
    expect(result.genres).toBe(genres);
  });
});
