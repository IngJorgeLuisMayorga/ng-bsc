import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../users/user.model';
import { Order } from './orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  public _activeOrder: BehaviorSubject<Order> = new BehaviorSubject(null);
  public activeOrder$: Observable<Order> = this._activeOrder.asObservable();

  public _ordersByUser: BehaviorSubject<Order[]> = new BehaviorSubject([]);
  public ordersByUser$: Observable<Order[]> = this._ordersByUser.asObservable();

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
    });
    this._ordersByUser.next(out);
   return out;
  }

  async getByOrderId(id: number): Promise<Order> {
    const order = await this.$http.get<Order>(`${environment.server}/orders/${id}`).toPromise();
    if(order.ordered_at && !order.shipped_at && ! order.delivered_at){
      order.state = "ORDERED"
    }
    if(order.ordered_at && order.shipped_at && ! order.delivered_at){
      order.state = "SHIPPED"
    }
    if(order.ordered_at && order.shipped_at &&  order.delivered_at){
      order.state = "DELIVERED"
    }
    order.products = JSON.parse((order as any).products_json);
    this._activeOrder.next(order);
   return order;
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

  async setActiveOrderById(id: number){
    const order = await this.getByOrderId(id);
    this._activeOrder.next(order);
  }

  async setActiveOrderByNextId(id: number){
    const orders = this._ordersByUser.getValue();
    const currentOrderIndex = orders.findIndex(order => order.id === id);
    const nextOrderIndex = Math.min(currentOrderIndex + 1, orders.length);
    const nextOrder = await this.getByOrderId(orders[nextOrderIndex].id);
    this._activeOrder.next(nextOrder);
  }
  async setActiveOrderByPrevId(id: number){
    const orders = this._ordersByUser.getValue();
    const currentOrderIndex = orders.findIndex(order => order.id === id);
    const prevOrderIndex = Math.max(currentOrderIndex - 1, 0);
    const prevOrder = await this.getByOrderId(orders[prevOrderIndex].id);
    this._activeOrder.next(prevOrder);
  }

  async updateOrderStatus(id: number, status: string, payload: any){
    const order = await this.$http.patch<Order[]>(`${environment.server}/orders/${id}`, {
      status: status,
      ...payload
    }).toPromise();
    return order;
  }

}
