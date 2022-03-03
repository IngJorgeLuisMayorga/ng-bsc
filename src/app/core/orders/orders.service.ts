import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private $http: HttpClient) { }

  async getByUserId(id: number): Promise<Order[]> {
    const orders = await this.$http.get<Order[]>(`${environment.server}/orders/by/user/${id}`).toPromise();
    const out: Order[] = orders.map((order:Order) => {
      if(order.ordered_at && !order.shipped_at && ! order.delivered_at){
        order.state = "ORDERED"
      }
      if(order.ordered_at && order.shipped_at && ! order.delivered_at){
        order.state = "SHIPPED"
      }
      if(order.ordered_at && order.shipped_at &&  order.delivered_at){
        order.state = "DELIVERED"
      }
       return order
    })
   return out;
  }
  async getAll(): Promise<Order[]> {
    const orders = await this.$http.get<Order[]>(`${environment.server}/orders`).toPromise();
    const out: Order[] = orders.map((order:Order) => {
      if(order.ordered_at && !order.shipped_at && ! order.delivered_at){
        order.state = "ORDERED"
      }
      if(order.ordered_at && order.shipped_at && ! order.delivered_at){
        order.state = "SHIPPED"
      }
      if(order.ordered_at && order.shipped_at &&  order.delivered_at){
        order.state = "DELIVERED"
      }
       return order
    })
   return out;
  }
  
  

}
