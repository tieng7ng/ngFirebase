import { TestBed } from '@angular/core/testing';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR
      })
    ],
  }));

  it('should be created', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    expect(service).toBeTruthy();
  });
});
