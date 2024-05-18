import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from '../auth/token.service';   
import { environment } from "../../environments/environment";
import { GetOrder } from '../models/getorder.model';
import { BehaviorSubject, Observable, tap } from 'rxjs'; 


@Injectable({
    providedIn: 'root'
})
export class OrderService{
 

    private baseUrl: string = environment.base_url + "/order/user/";
    
    
    constructor(private http: HttpClient, private tokenService: TokenService) {} 

    public getOrders(): Observable<GetOrder[]> {
        return this.http.get<GetOrder[]>(this.baseUrl + this.tokenService.getUserId());
      }
 

        // public getOrderHistory() {
    //     return this.http.get<any[]>('api/order-history')
    // } 

} 