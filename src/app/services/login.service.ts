import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null = null;
  private user: any | null = null;



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
    
  }


  //generate token by loggin in the user
  public generateToken(loginData: any) {

    return this.http.post(`${environment.apiBaseUrl}/login`, loginData, this.httpOptions)

  }

  //login user: set token in localStorage
  public loginUser(token: any){
    this.authService.setToken(token);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = this.authService.getToken();
    if(tokenStr ==  undefined || tokenStr == '' || tokenStr == null){
      return false;
    } else {
      return true;
    }
  }

  //isLogout: remove token from local Storage
  public logout(){
    this.authService.setToken(null);
    this.authService.setUserData(null)
    return true;
  }

  //get Token : if needed in case.
  public getToken() {
    return this.authService.getToken();
  }

  //set userDetail
  public setUser(user: any) {
    // localStorage.setItem('user', JSON.stringify(user));
    this.authService.setUserData(JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = this.authService.getUserData();
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

  //get user role
}
