export class Book {
  key: string;
  photo: string;
  synopsis: string;

  amount: number;

  constructor(public title: string, public description: string) {
  }
}