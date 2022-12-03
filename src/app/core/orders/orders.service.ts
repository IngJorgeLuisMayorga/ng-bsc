import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICheckoutProduct } from 'src/app/pages/checkout-page/models/checkout-cart.model';
import { environment } from 'src/environments/environment';
import { Product } from '../products/models/IProduct.model';
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

  resetActiveOrder(){
    this._activeOrder.next(null);
  }
  async getByUserId(id: number): Promise<Order[]> {
    const orders = await this.$http.get<Order[]>(`${environment.server}/orders/by/user/${id}`).toPromise();
    const out: Order[] = orders.map((order:Order) => {
      if(order.shipping_ordered_at && !order.shipping_shipped_at && ! order.shipping_delivered_at){
        order.state = "ORDERED"
      }
      if(order.shipping_ordered_at && order.shipping_shipped_at && ! order.shipping_delivered_at){
        order.state = "SHIPPED"
      }
      if(order.shipping_ordered_at && order.shipping_shipped_at &&  order.shipping_delivered_at){
        order.state = "DELIVERED"
      }
       return order
    }).sort((a,b) => (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))
    .filter(order => order.shipping_ordered_at)
    this._ordersByUser.next(out);
   return out;
  }
  async getByOrderId(id: number): Promise<Order> {
    const order = await this.$http.get<Order>(`${environment.server}/orders/${id}`).toPromise();
    if(order.shipping_ordered_at && !order.shipping_shipped_at && ! order.shipping_delivered_at){
      order.state = "ORDERED"
    }
    if(order.shipping_ordered_at && order.shipping_shipped_at && ! order.shipping_delivered_at){
      order.state = "SHIPPED"
    }
    if(order.shipping_ordered_at && order.shipping_shipped_at &&  order.shipping_delivered_at){
      order.state = "DELIVERED"
    }
    const productsSKU = JSON.parse((order as any).order_products_json);
    const products = await this.$http.get<Product[]>(`${environment.server}/products/by/ids/${productsSKU.map((item:any) => item.id)}`).toPromise();
    order.products = products.map(product => {
      return {
        ...product,
        quantity: productsSKU.find(
          (sku:any) => sku.id === product.id
        ).qty
      }
    })
    console.log(' ')
    console.log(' products ')
    console.log(products)
    console.log(' ')
    this._activeOrder.next(order);
   return order;
  }
  async getAll(): Promise<Order[]> {
    const orders = await this.$http.get<Order[]>(`${environment.server}/orders`).toPromise();
    const out: Order[] = orders.map((order:Order) => {
      if(order.shipping_ordered_at && !order.shipping_shipped_at && ! order.shipping_delivered_at){
        order.state = "ORDERED"
      }
      if(order.shipping_ordered_at && order.shipping_shipped_at && ! order.shipping_delivered_at){
        order.state = "SHIPPED"
      }
      if(order.shipping_ordered_at && order.shipping_shipped_at &&  order.shipping_delivered_at){
        order.state = "DELIVERED"
      }
       return order
    })
   return out;
  }
  async setActiveOrderById(id: number){
    const order = await this.getByOrderId(id);
    this._activeOrder.next(order);
    return order;
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
  async updateOrderStatus(id: number, shipping_status: string, payload: any){
    const order = await this.$http.patch<Order[]>(`${environment.server}/orders/${id}`, {
      ...payload,
      shipping_status: shipping_status
    }).toPromise();
    return order;
  }
  async create(payload:any){
    const order = this.$http.post<Order>(`${environment.server}/orders`, payload).toPromise();
    return order;
  }
  async patch(orderId:number, payload: any): Promise<Order>{
    const order = this.$http.patch<Order>(`${environment.server}/orders/${orderId}`, payload).toPromise();
    return order;
  }

  async getProductsByIds(ids: number[]): Promise<ICheckoutProduct[]>{
    const products = await this.$http.get<Product[]>(`${environment.server}/products/by/ids/${ids.join(',')}`).toPromise();
    return products.map(item => {
      return {
        id: item.id,
        description: item.description,
        brand: item.brand,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        title: item.name,
        photo: item.image1_src,
        total: item.quantity * (1 - item.discount/100) * (item.price)
      }
    })
  }

}
