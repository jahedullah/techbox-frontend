import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http : HttpClient, private authService: AuthService) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
    withCredentials : true
  }
  //get the current logged in User
  public getCurrentUser() {
    return this.http.get(`${environment.apiBaseUrl}/current-user`, this.httpOptions);

    // const user = this.getUser();
    // if (user) {
    // // Create an observable that emits the user object
    // return of(user);
    // } else {
    //   // Handle the case where the user is not found
    //   this.logout();
    //   return throwError('User not found');
    // }
    
  }

  // public getCurrentUserApi(){
  //   return this.http.get(`${environment.apiBaseUrl}/current-user`, this.httpOptions);
  // }


  //generate token by loggin in the user
  public generateToken(loginData: any) {

    return this.http.post(`${environment.apiBaseUrl}/login`, loginData, this.httpOptions)

  }

  refreshToken(){
    console.log('in refreshtoken api')
    return this.http.put(`${environment.apiBaseUrl}/refreshtoken`, null ,  this.httpOptions)
  }

  //login user: set token in localStorage
  public loginUser(accessToken: any, refreshToken:any){
    this.authService.setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);

    this.authService.setRefreshToken(refreshToken);
    localStorage.setItem('refreshToken', refreshToken);

    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    // let tokenStr = this.authService.getToken();
    let tokenStr = localStorage.getItem('accessToken');
    if(tokenStr ==  undefined || tokenStr == '' || tokenStr == null){
      return false;
    } else {
      return true;
    }
  }

  //isLogout: remove token from local Storage
  public logout(){
    this.authService.setAccessToken(null);
    this.authService.setRefreshToken(null);
    this.authService.setUserData(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user');
    return true;
  }

  //get Token : if needed in case.
  public getAccessToken() {
    // return this.authService.getToken();
    return localStorage.getItem('accessToken');
  }

  public getRefreshToken() {
    // return this.authService.getToken();
    return localStorage.getItem('refreshToken');
  }

  //set userDetail
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    // this.authService.setUserData(JSON.stringify(user));
  }

  //getUser
  public getUser() {
    // let userStr = this.authService.getUserData();
    let userStr = localStorage.getItem('user');
    if (userStr != null){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  //get UserRole
  public getUserRole() {
    let user = this.getUser();
    return user.userType;
  }


}
