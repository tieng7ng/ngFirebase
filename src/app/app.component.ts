import { Component } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD76lsd6DVIMiIpLJsVQX4X0_uOkGHdQrM",
      authDomain: "firstproject-998a2.firebaseapp.com",
      databaseURL: "https://firstproject-998a2.firebaseio.com",
      projectId: "firstproject-998a2",
      storageBucket: "firstproject-998a2.appspot.com",
      messagingSenderId: "43949308687"
    };
    firebase.initializeApp(config);
  }
}
