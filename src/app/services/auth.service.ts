import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private userData: any | null = null;

  constructor() { }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setUserData(userData: any) {
    this.userData = userData;
  }

  getUserData() {
    return this.userData;
  }
}