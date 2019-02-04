import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  id: string;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private booksService: BooksService,
    private reservationService: ReservationService,
    private router: Router) { }

  ngOnInit() {
    this.book = new Book('', '');
    this.id = this.route.snapshot.params['id'];

    this.booksService.getSingleBook(this.id).subscribe(
      data => {
        this.book = data;
      }
    );
    this.booksService.emitBooks();
  }

  onBack() {
    this.router.navigate(['/books']);
  }

  onEdit() {
    this.router.navigate(['/books', 'edit', this.id]);
  }

  onDelete() {
    console.log('==== DELETE');
    this.booksService.deleteBook(this.id)
      .subscribe(res => {
        //        let id = res['key'];
        this.router.navigate(['/boards']);
      }, (err) => {
        console.log(err);
      });

    this.router.navigate(['/books']);
  }

  onReserve() {
    this.reservationService.addBook(this.book);
    this.logger.debug('[single-book component] onReserve');
    this.logger.debug(
      this.reservationService.reservation);
  }


}