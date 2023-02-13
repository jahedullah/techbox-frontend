import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http : HttpClient) { }

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
    localStorage.setItem('token', token);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if(tokenStr ==  undefined || tokenStr == '' || tokenStr == null){
      return false;
    } else {
      return true;
    }
  }

  //isLogout: remove token from local Storage
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get Token : if needed in case.
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser() {
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
    let user = this.getUser()
    return user.userType;

  }

  //get user role
}
