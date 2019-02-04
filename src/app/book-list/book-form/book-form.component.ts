import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  id: string;

  constructor(
    private logger: NGXLogger,
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.id = this.route.snapshot.params['id'];

    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      synopsis: ''
    });

    if (this.id) {
      this.booksService.getSingleBook(this.id).subscribe(
        data => {
          this.bookForm.patchValue({
            title: data.title,
            description: data.description,
            synopsis: data.synopsis
          });
        }
      );
    }
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const description = this.bookForm.get('description').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, description);
    newBook.synopsis = synopsis;

    if (this.id) {
      //=====
      // MAJ
      this.logger.debug('>>> onSave', newBook);


      this.booksService.saveBooks(this.id, newBook)
        .subscribe(
          res => {
            this.logger.debug('>>> save', res);
            this.router.navigate(['/boards']);
          },
          (err) => {
            this.logger.debug(err);
          }
        );

      this.router.navigate(['/books']);
      // MAJ
      //=====
    } else {
      //=====
      // ADD
      this.booksService.createNewBook(newBook)
        .subscribe(res => {
          this.logger.debug(res);

          //        let id = res['key'];
          this.router.navigate(['/boards']);
        },
          (err) => {
            console.log(err);
          }
        );

      this.router.navigate(['/books']);
      // ADD
      //=====
    }
  }

}

