import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private URL = "http://localhost:8080/library";

  constructor(private http: HttpClient) {  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.URL);
  }

  insertNewBook(newBook: Book):Observable<Book> {
    return this.http.post<Book>(this.URL, newBook)
  }

  removeBookFromLibrary(id: string):Observable<object>{
    return this.http.delete(`${this.URL}/${id}`)
  }

  updateBookInfo(book: Book): Observable<Book> {
    return this.http
      .put<Book>(`${this.URL}/${book.id}`, book);
  }

  findBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.URL}/${id}`);
  }
}
