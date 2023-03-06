import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private userData: any | null = null;

  constructor() { }

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken() {
    return this.accessToken;
  }

  setRefreshToken(token: string | null) {
    this.refreshToken = token;
  }

  getRefreshToken() {
    return this.refreshToken;
  }

  setUserData(userData: any) {
    this.userData = userData;
  }

  getUserData() {
    return this.userData;
  }
}