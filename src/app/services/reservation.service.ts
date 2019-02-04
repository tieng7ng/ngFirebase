import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { Reservation } from '../models/reservation.model';

import { AuthService } from '../services/auth.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public reservation: Reservation;

  ref = firebase.firestore().collection('reservations');


  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
  ) {
    this.logger.debug('>>>> reservation service constructor', this.authService.email);
    this.reservation = new Reservation();
  }


  ngOnInit() {
    this.logger.debug('>>>> reservation service ngOnInit', this.authService.email);
    this.reservation = new Reservation();

  }

  /**
   * 
   * @param book 
   */
  addBook(book: Book) {
    this.logger.debug('[ReservationService] addBook');
    let bookExist: boolean = false;
    for (let cmpt = 0; cmpt < this.reservation.listBook.length; cmpt++) {
      this.logger.debug(this.reservation.listBook[cmpt].key);

      if (this.reservation.listBook[cmpt].key == book.key) {
        this.reservation.listBook[cmpt].amount ++;
        this.logger.debug(this.reservation.listBook[cmpt] );
        bookExist = true;
      }
    }
    if (!bookExist) {
      book.amount = 1;
      this.reservation.listBook.push(book);
    }

    this.logger.debug(
      this.reservation.userEmail, JSON.stringify(this.reservation.listBook)
    );

    
  }

  createNewReservation(): Observable<any> {
    
    this.reservation.date = new Date();
    this.reservation.userEmail = this.authService.email;
    
    var data = JSON.parse(JSON.stringify(
      this.reservation));

    this.logger.debug('>>> createNewReservation', this.reservation.userEmail, JSON.stringify(
      this.reservation), data);

    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  getReservation(): Observable<any> {
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


}
