import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NGXLogger } from 'ngx-logger';

import { ReservationService } from '../services/reservation.service';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  private listReservation;
  private displayButtonNewReservation;

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private reservationService: ReservationService
  ) {

  }

  ngOnInit() {
    this.logger.debug('[ReservationListComponent] ngOnInit',
    this.reservationService.reservation.listBook);
    this.listReservation = this.reservationService.reservation.listBook;

    if (this.listReservation.length == 0) {
      this.displayButtonNewReservation = false;
    } else {
      this.displayButtonNewReservation = true;
    }

  }

  onNewReservation() {
    this.reservationService.createNewReservation()
    .subscribe(res => {
      this.logger.debug(res);

      //        let id = res['key'];
      this.router.navigate(['/boards']);
    },
      (err) => {
        console.log(err);
      }
    );
  }

}
