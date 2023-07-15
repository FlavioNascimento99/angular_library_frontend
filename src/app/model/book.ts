export class Book {
  id?: string;
  title: string;
  autor: string;
  description: string;
  exemplar: number;
  constructor(id?: string, book: Book = {title: '', autor: '', description: '', exemplar: 0}) {
    this.id = id;
    this.title = book.title;
    this.autor = book.autor;
    this.description = book.description;
    this.exemplar = book.exemplar;
  }
}
