import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../entities/book.entity';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  @Input()
  books: Book[];

  @Output()
  removedBook: EventEmitter<string> = new EventEmitter<string>();

  public displayedColumns: string[] = [
    'pictureLocation', 'name', 'genre', 'description', 'author', 'numberOfPages', 'identifier'
  ];

  constructor() {
  }

  ngOnInit() {
  }

  removeBook(bookId: string): void {
    this.removedBook.emit(bookId);
  }

  trackById(book: Book): string {
    return book.identifier;
  }
}
