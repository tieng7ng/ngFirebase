import { TestBed } from '@angular/core/testing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { BooksService } from './books.service';

describe('BooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR
      })
    ],

  }));

  it('should be created', () => {
    const service: BooksService = TestBed.get(BooksService);
    expect(service).toBeTruthy();
  });
});
