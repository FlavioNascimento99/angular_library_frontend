import { Component } from '@angular/core';
import {Book} from "../../model/book";
import {LibraryService} from "../../service/library.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  books: Book[];

  constructor(private libService: LibraryService) {
    this.books = new Array<Book>();
  }
  ngOnInit(): void {
    this.libService.getBooks().subscribe(
      getShelfBooks => this.books = getShelfBooks
    )
  }
  removeBookFromShelf(toRemove: Book): void {
    const id = toRemove.id || '';
    this.libService.removeBookFromLibrary(id).subscribe(
      removed => {
        console.log(removed);
        const bookPosition = this.books.findIndex(book => book.id === toRemove.id);
        if (bookPosition > -1){
          this.books.splice(bookPosition, 1)
        }
      }
    )
  }
}
