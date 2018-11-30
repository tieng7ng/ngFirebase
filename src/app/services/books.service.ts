import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';

import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  ref = firebase.firestore().collection('books');

  constructor() {
    this.getBooks();
  }

  emitBooks() {
    console.log('>>> emitBooks');
    console.log(this.booksSubject);
    this.booksSubject.next(this.books);
    console.log(this.booksSubject);
  }

  getBooks(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let books = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          console.log(data, doc);
          books.push({
            key: doc.id,
            title: data.title,
            description: data.description,
            synopsis: data.synopsis
          });
        });
        observer.next(books);
      });
    });
  }

  getSingleBook(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        
        console.log('===== getSingleBook', id, data);
        observer.next({
          key: doc.id,
          title: data.title,
          description: data.description,
          synopsis: data.synopsis
      });
      });
    });
  }

  saveBooks(id: string, book: Book): Observable<any> {
    console.log('>>> saveBook', book);
    var data = JSON.parse(JSON.stringify(book));
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  createNewBook(newBook: Book): Observable<any> {
    console.log('>>> createNewBook', newBook);
    var data = JSON.parse(JSON.stringify(newBook));
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  deleteBook(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
