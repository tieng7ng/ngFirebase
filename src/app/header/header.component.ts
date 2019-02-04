import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

import { AuthService } from '../services/auth.service';
import { ReservationService } from '../services/reservation.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  private displayReservation: boolean;

  // display email in heander
  private emailCurrent: string;

  constructor(
    private logger: NGXLogger,
    private authService: AuthService,
    private reservationService: ReservationService,
  ) {

  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.emailCurrent = user.email;
          this.authService.email = user.email;

          //=====
          // Display button : 'Reservation' ?
          if (this.reservationService.reservation.listBook.length == 0) {
            this.displayReservation = false;
          } else {
            this.displayReservation = true;
          }
          // Display button : 'Reservation' ?
          //=====


          this.logger.debug(
            '[header component] ngOnInit',
            this.reservationService.reservation.listBook,
            this.reservationService.reservation.listBook.length);


          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
    this.emailCurrent = '';
  }

}