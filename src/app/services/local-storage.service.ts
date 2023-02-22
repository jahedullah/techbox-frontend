import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageSubject = new Subject<string>();
  private authToken: string | null;
  private userData: any | null;

  constructor() {
    // Initialize authToken and userData from local storage
    console.log("local service constructor");
    this.authToken = localStorage.getItem('token');
    let storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
        try {
            this.userData = JSON.parse(storedUser);
          } catch (e) {
            console.error('Error parsing user data from localStorage', e);
          }
      }


    // Listen for changes to the 'authToken' and 'userData' local storage items
    window.addEventListener('storage', (event) => {
        console.log("something changed " +event);
      if (event.key === 'token') {
        this.authToken = event.newValue;
        this.checkForChanges();
      }
      if (event.key === 'user') {
        const newValue = event.newValue;
        if (newValue) {
            this.userData = JSON.parse(newValue);
            this.checkForChanges();
        }
        this.checkForChanges();
      }
    });
  }

  public getStorageChanges() {
    return this.storageSubject.asObservable();
  }

  public setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
    this.authToken = token;
    this.checkForChanges();
  }

  public setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userData = userData;
    this.checkForChanges();
  }

  public removeAuthToken() {
    localStorage.removeItem('authToken');
    this.authToken = null;
    this.checkForChanges();
  }

  public removeUserData() {
    localStorage.removeItem('userData');
    this.userData = null;
    this.checkForChanges();
  }

  private checkForChanges() {
    if (!this.authToken || !this.userData) {
      // If either the auth token or user data is missing, emit a logout event
      this.storageSubject.next('logout');
    } else {
      // Otherwise, emit a storage change event
      this.storageSubject.next('storageChange');
    }
  }

}
