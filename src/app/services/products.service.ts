import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Product } from '../models/product.model'; 
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string = environment.base_url + "/products"; 

  private _orderEndpoint: string = 'http://localhost:8080/api/orders'; 

 
  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  public getProductByIndex(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);

  }

  public updateProductByIndex(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  } 

  public sendOrders(request: Order): void{ 
    this.http
    .post<string>(this._orderEndpoint, request) 
    .subscribe(

      res=>{
 
       console.log(res);
 
      },     err=>{
 
        console.log(err);
 
      });
     
}


}
