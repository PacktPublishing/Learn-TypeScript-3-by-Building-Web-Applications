import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    for (const genreKey of Object.keys(Genre)) {
      this.genres.push(genreKey);
    }

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      numberOfPages: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      pictureLocation: '',
      description: ''
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
