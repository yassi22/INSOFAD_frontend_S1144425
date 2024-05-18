import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class OrderService{
    constructor(private http: HttpClient) {}
    
    public getOrderHistory() {
        return this.http.get<any[]>('api/order-history')
    }
} 