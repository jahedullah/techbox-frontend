import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';
import { ProductAddAndUpdate } from '../models/productAddAndUpdate';

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

  public addProduct(product: ProductAddAndUpdate): Observable<Product> {
    return this.http.post<Product>(`${environment.apiBaseUrl}/products`, product, this.httpOptions);
  }

  public updateProduct(product: ProductAddAndUpdate, id: number): Observable<Product> {
    console.log("updating product")
    return this.http.put<Product>(`${environment.apiBaseUrl}/products/${id}`, product, this.httpOptions)
  }

  public patchProduct(product: ProductAddAndUpdate, id: number): Observable<Product> {
    console.log("patching product")
    return this.http.patch<Product>(`${environment.apiBaseUrl}/products/${id}`, product, this.httpOptions)
  }



  public deleteProduct(id: number):Observable<Product> {
    console.log(id);
    return this.http.delete<Product>(`${environment.apiBaseUrl}/products/${id}`,  this.httpOptions);
  }

}
