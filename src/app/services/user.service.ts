import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
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

  public getUserProducts(userId: number): Observable<Product[]> {
    console.log(userId)
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/users/${userId}/products` , this.httpOptions);
  }

  public productAddToWishList(userId:number , productId: number): Observable<Product>{
    console.log("In api call");
    return this.http.patch<Product>(`${environment.apiBaseUrl}/users/${userId}/products/${productId}` ,{}, this.httpOptions);

  }
} 
