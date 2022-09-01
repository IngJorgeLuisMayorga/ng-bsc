import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/orders/orders.model';
import { Wishlist } from 'src/app/core/wishlist/Wishlist.model';
import { UsersService } from 'src/app/core/users/users.service';
import { User } from '../../../core/users/user.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { environment } from 'src/environments/environment';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-admin-page-orders',
  templateUrl: './admin-page-orders.component.html',
  styleUrls: ['./admin-page-orders.component.less']
})
export class AdminPageOrdersComponent implements OnInit {

  public orders: Order[] | null;
  public states: "ORDERED" | "SHIPPED" | "DELIVERED" | "CANCELED" | "RETURNED";
  public companies: "COORDINADORA" | "ENVIA" | "SERVIENTREGA";
  public companiesOptions: any[];
  public statesOptions: any[];
  public value: any;

  constructor(
    private route: ActivatedRoute, 
    private $user: UsersService,
    private $orders: OrdersService,
    private $wishlist: WishlistService
  ) {
    this.statesOptions = [
      {icon: 'pi pi-shopping-cart', state: 'ORDERED'},
      {icon: 'pi pi-send', state: 'SHIPPED'},
      {icon: 'pi pi-check-circle', state: 'DELIVERED'}
    
  ];
  this.companiesOptions = [
    {
      name: 'ENVIA'
    },
    {
      name: 'COORDINADORA'
    },
    {
      name: 'SERVIENTREGA'
    },
  ]
  }

  async ngOnInit() {
    this.orders = await (await this.$orders.getAll()).filter(order => order.shipping_ordered_at);
    this.orders.map(order => {
      let _state = this.statesOptions[0];
      let _order = order;
      if(order.state === 'ORDERED') _state = this.statesOptions[0];
      if(order.state === 'SHIPPED') _state = this.statesOptions[1];
      if(order.state === 'DELIVERED') _state = this.statesOptions[2];
      _order.state = _state;
      _order.shipping_guide_company = this.companiesOptions.find(company => company.name === order.shipping_guide_company)
      return _order;
    });
  }

  getInvoicePDF(id: string){
    return environment.server + '/orders/pdf/' + id;
  }

  setShippingCode(shippingCode: any, order: Order){
     order.shipping_guide_ref = shippingCode.value;
  }

  onSelectButton(order: Order){
  
    console.log(' ')
    console.warn({order})
    console.log(' ')

    if((order.state as any).state === 'ORDERED'){
      const isOk = window.confirm('MOVER ORDEN A "ORDERED" ')
      if(isOk) this.onSaveOnOrder(order.id);      
    }

    if((order.state as any).state === 'SHIPPED'){
      //const isOk = window.confirm('MOVER ORDEN A "SHIPPED" ')
      //if(isOk)  this.onSaveOnShipping();   
    }

    if((order.state as any).state === 'DELIVERED'){
      //order.shipping_delivered_at = new Date();
       const isOk = window.confirm('MOVER ORDEN A "DELIVERED" ')
       if(isOk)  this.onSaveOnDelivered(order.id);
    }

    if((order.state as any).state === 'CANCELED'){
      //order.delivered_at = new Date();
       const isOk = window.confirm('MOVER ORDEN A "CANCELED" ')
       if(isOk)  this.onSaveOnCanceled(order.id);
    }

    if((order.state as any).state === 'RETURNED'){
      //order.delivered_at = new Date();
       const isOk = window.confirm('MOVER ORDEN A "RETURNED" ')
       if(isOk)  this.onSaveOnReturned(order.id);
    }

  }



  onSelectCompany(order: any){
    console.log('onSelectCompany')
   console.log(order)
  }

  
  onSaveOnOrder(orderId: number){
    console.log(' onSaveOnOrder(orderId: number) ');
    this.$orders.updateOrderStatus(orderId, 's1_ordered', {});
  }

  onSaveOnShipping(order: Order){
  console.log('onSaveShipping', order)
   const isOk = window.confirm('MOVER ORDEN A "SHIPPED" ')
   if(isOk){
    this.$orders.updateOrderStatus(order.id, 's2_shipped', {
      shipping_guide_ref: order.shipping_guide_ref,
      shipping_guide_company: (order.shipping_guide_company as any).name,
    });
   }
  }

  onSaveOnDelivered(orderId: number){
    console.log(' onSaveOnDelivered(orderId: number) ');
    this.$orders.updateOrderStatus(orderId, 's3_delivered', {});
  }

  onSaveOnCanceled(orderId: number){
    console.log(' onSaveOnCanceled(orderId: number) ');
    this.$orders.updateOrderStatus(orderId, 's4_canceled', {});
  }

  onSaveOnReturned(orderId: number){
    this.$orders.updateOrderStatus(orderId, 'RETURNED', {});
  }

}
