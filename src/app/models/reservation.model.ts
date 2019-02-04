import { Book } from './book.model';

export class Reservation {
  userEmail: string;
  date: Date;
  listBook: Book[];


  constructor() {
    this.listBook = [];
  }
}