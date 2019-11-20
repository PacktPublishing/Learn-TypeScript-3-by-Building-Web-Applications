import { Media } from '../../shared/entities/abstract-media.entity';
import { Genre } from '../../shared/enums/genre.enum';
import { Expose, Type } from 'class-transformer';

export class Book extends Media {
  constructor(
    name: string,
    description: string,
    pictureLocation: string,
    genre: Genre,
    author: string,
    numberOfPages: number,
    identifier?: string
  ) {
    super(name, description, pictureLocation, genre, identifier);
    this._numberOfPages = numberOfPages;
    this._author = author;
  }

  private _author: string;

  @Expose()
  get author(): string {
    return this._author;
  }

  set author(author: string) {
    this._author = author;
  }

  @Type(() => Number)
  private _numberOfPages: number;

  @Expose()
  get numberOfPages(): number {
    return this._numberOfPages;
  }

  set numberOfPages(numberOfPages: number) {
    this._numberOfPages = numberOfPages;
  }
}
