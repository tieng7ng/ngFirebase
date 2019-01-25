import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  createNewUser(email: string, password: string) {
    //=====
    // promise
    return new Promise(
      (resolve, reject) => {
        //=====
        // then
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            console.log('createNewUser ' + error);
            reject(error);
          }
        );
        // then
        //=====
      }
    );
    // promise
    //=====
  }

  signInUser(email: string, password: string) {
    //=====
    // promise
    return new Promise(
      (resolve, reject) => {
        //=====
        // then
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
        // then
        //=====
      }
    );
    // promise
    //=====

  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
