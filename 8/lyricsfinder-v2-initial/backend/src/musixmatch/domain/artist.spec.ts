import {Artist} from './artist';

/* tslint:disable:no-unused-expression */

describe('artist', () => {
  it('should not accept an undefined id', () => {
    expect(() => {
      new Artist(null as unknown as string, 'foo');
    }).toThrow();

    expect(() => {
      new Artist(undefined as unknown as string, 'foo');
    }).toThrow();
  });

  it('should not accept an empty id', () => {
    expect(() => {
      new Artist('', 'foo');
    }).toThrow();

    expect(() => {
      new Artist('   ', 'foo');
    }).toThrow();
  });

  it('should not accept an undefined name', () => {
    expect(() => {
      new Artist('foo', null as unknown as string);
    }).toThrow();

    expect(() => {
      new Artist('foo', undefined as unknown as string);
    }).toThrow();
  });

  it('should not accept an empty name', () => {
    expect(() => {
      new Artist('foo', '');
    }).toThrow();

    expect(() => {
      new Artist('foo', '   ');
    }).toThrow();
  });

  it('should create if everything is valid', () => {
    const id = 'fooId';
    const name = 'fooName';

    const result = new Artist(id, name);

    expect(result).toBeTruthy();
    expect(result).toBeInstanceOf(Artist);
    expect(result.id).toBe(id);
    expect(result.name).toBe(name);
  });
});
