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
    return orders;
  }
  async getAll(): Promise<Order[]> {
    const orders = await this.$http.get<Order[]>(`${environment.server}/orders`).toPromise();
    return orders;
  }
  
  

}
