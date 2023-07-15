import {Component, OnInit} from '@angular/core';
import {LibraryComponent} from "../library/library.component";
import {Book} from "../../model/book";
import {LibraryService} from "../../service/library.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  book : Book;
  library : Array<Book>;

  addingBookToLibrary = true;
  buttonFunctionName = 'Create';

  // @ts-ignore
  formReactive: FormGroup;

  ngOnInit() {

    this.formReactive = new FormGroup({
      title: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      exemplar: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      description: new FormControl('', Validators.required)
    })

  }

  constructor(private libService: LibraryService, private snackBar: MatSnackBar, actualRoute: ActivatedRoute) {
    this.book = new Book();
    this.library = [];

    if (actualRoute.snapshot.paramMap.has('id')) {
      const idForEditing = actualRoute.snapshot.paramMap.get('id');
      if (idForEditing) {
        this.addingBookToLibrary = false;
        this.buttonFunctionName = 'Confirm edit';
        const bookFounded = this.libService.findBook(idForEditing).subscribe(
          bookFounded => this.book= bookFounded
        );
      }
    }
  }

  onInputChange() {
    // @ts-ignore
    if (this.post.commentary.length > this.textLength) {
      this.snackBar.open('Limite de caracteres excedido!', 'Fechar', {
        duration: 3000,
      });
    }
  }

  createOrUpdateBook() {
    if (this.addingBookToLibrary) {
      this.libService.insertNewBook(this.book).subscribe(
        createPost => this.snackBar.open('book successfully added ✅', 'Fechar', {
          duration: 4500,
        })
      );
      this.book = new Book();
    } else {
      this.libService.updateBookInfo(this.book).subscribe(
        updatePost => this.snackBar.open('successfully updated information ✅', 'Fechar', {
          duration: 3000,
        })
      )
    }
  }
}
