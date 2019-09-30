import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookNewComponent } from './components/book-new/book-new.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BookPageComponent, BookNewComponent, BookListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BookPageComponent]
})
export class BookModule {
}
