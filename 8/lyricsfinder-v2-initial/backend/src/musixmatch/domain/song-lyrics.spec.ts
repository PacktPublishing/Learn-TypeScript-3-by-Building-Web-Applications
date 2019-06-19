import {SongLyrics} from './song-lyrics';

/* tslint:disable:no-unused-expression */

describe('song lyrics', () => {
  it('should not accept an undefined id', () => {
    expect(() => {
      new SongLyrics(null as unknown as string, 'foo', true, '');
    }).toThrow();

    expect(() => {
      new SongLyrics(undefined as unknown as string, 'foo', true, '');
    }).toThrow();
  });

  it('should not accept an empty id', () => {
    expect(() => {
      new SongLyrics('', 'foo', true, '');
    }).toThrow();

    expect(() => {
      new SongLyrics('   ', 'foo', true, '');
    }).toThrow();
  });

  it('should accept an empty copyright', () => {
    expect(new SongLyrics('foo', 'bar', true, '')).toBeInstanceOf(SongLyrics);
  });

  it('should create if everything is valid', () => {
    const id = 'fooId';
    const lyrics = 'fooLyrics';
    const explicit = true;
    const copyright = 'fooCopyright';

    const result = new SongLyrics(id, lyrics, explicit, copyright);

    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(SongLyrics);
    expect(result.id).toBe(id);
    expect(result.lyrics).toBe(lyrics);
    expect(result.explicit).toBe(explicit);
    expect(result.copyright).toBe(copyright);
  });
});
