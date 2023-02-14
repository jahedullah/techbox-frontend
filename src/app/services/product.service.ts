import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { 

  }

  public getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiBaseUrl}/products`, product)
  }

  public updateProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${environment.apiBaseUrl}/products/id`, product)
  }

  public deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiBaseUrl}/products`);
  }

}
