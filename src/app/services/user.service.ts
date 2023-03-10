import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { User } from '../models/user';
import { UserPassChangeReq } from '../models/userPassChangeReq';
import { UserPassChangeResp } from '../models/userPassChangeResp';
import { UserUpdate } from '../models/userUpdate';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
    withCredentials : true
  }

  constructor(
    private http: HttpClient
  ) { }

  public addUser(user: any) {
    return this.http.post(`${environment.apiBaseUrl }/users`, user);
  }
  public updateUser(user: UserUpdate, userId: number): Observable<User>{
    return this.http.put<User>(`${environment.apiBaseUrl}/users/${userId}`, user, this.httpOptions);
  }

  public updateUserPassword(userPassChangeReq: UserPassChangeReq, userId: number): Observable<UserPassChangeResp>{
    return this.http.put<UserPassChangeReq>(`${environment.apiBaseUrl}/users/${userId}/password`, userPassChangeReq, this.httpOptions);
  }

  public getUserProducts(userId: number): Observable<Product[]> {
    console.log(userId)
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/users/${userId}/products` , this.httpOptions);
  }

  public productAddToWishList(userId:number , productId: number): Observable<Product>{
    console.log("In api call");
    return this.http.patch<Product>(`${environment.apiBaseUrl}/users/${userId}/products/${productId}` ,{}, this.httpOptions);

  }

  public productRemoveFromWishList(userId:number , productId: number): Observable<Product>{
    return this.http.delete<Product>(`${environment.apiBaseUrl}/users/${userId}/products/${productId}` , this.httpOptions);

  }

} 
