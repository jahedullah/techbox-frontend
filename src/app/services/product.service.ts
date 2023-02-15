import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { ProductUpdate } from '../models/productUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
    withCredentials : true
  }

  constructor(private http: HttpClient) { 

  }

  public getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiBaseUrl}/products`, product)
  }

  public updateProduct(product: ProductUpdate, id: number): Observable<Product> {
    console.log("updating")
    return this.http.put<Product>(`${environment.apiBaseUrl}/products/${id}`, product, this.httpOptions)
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiBaseUrl}/products`);
  }

}
