import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../shared/enums/genre.enum';
import { Book } from '../../entities/book.entity';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.scss']
})
export class BookNewComponent implements OnInit {
  @Output()
  created: EventEmitter<Book> = new EventEmitter<Book>();

  formGroup: FormGroup;
  genres: string[] = [];

  constructor() {
  }

  ngOnInit() {
    for (const genreKey of Object.keys(Genre)) {
      this.genres.push(genreKey);
    }

    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      numberOfPages: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      pictureLocation: new FormControl(''),
      description: new FormControl('')
    });
  }

  createBook(): void {
    if (this.formGroup.valid) {
      const rawValue: any = this.formGroup.getRawValue();

      for (const key of Object.keys(rawValue)) {
        rawValue[key] = rawValue[key] === null ? undefined : rawValue[key];
      }

      const bookToCreate: Book = new Book(rawValue.name, rawValue.description === null ? undefined : rawValue.description,
        rawValue.pictureLocation === null ? undefined : rawValue.pictureLocation,
        Genre[rawValue.genre as keyof typeof Genre], rawValue.author, rawValue.numberOfPages);

      this.created.emit(bookToCreate);
      this.formGroup.reset();
    }
  }
}
