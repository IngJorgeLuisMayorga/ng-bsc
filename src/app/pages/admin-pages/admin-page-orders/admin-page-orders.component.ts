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
      {icon: 'pi pi-check-circle', state: 'DELIVERED'},
      /*
      {icon: 'pi pi-ban', state: 'CANCELED'},
      {icon: 'pi pi-replay', state: 'RETURNED'},
      */
  ];
  }

  async ngOnInit() {
    this.orders = await this.$orders.getAll();
    this.orders.map(order => {

      let _state = this.statesOptions[0];
      let _order = order;
      if(order.state === 'ORDERED') _state = this.statesOptions[0];
      if(order.state === 'SHIPPED') _state = this.statesOptions[1];
      if(order.state === 'DELIVERED') _state = this.statesOptions[2];
      
      _order.state = _state;
      

      return _order;
      
    })


  }

  getInvoicePDF(id: string){
    return environment.server + '/orders/pdf/' + id;
  }

  setShippingCode(shippingCode: any, orderK: number){
    const isOk = window.confirm('AGREGAR NUMERO DE GUIA')
    if(isOk){
      this.orders.find(order => order.id === orderK).shipping_code = shippingCode.value;
      this.orders.find(order => order.id === orderK).shipped_at = new Date();
      this.orders.find(order => order.id === orderK).state = this.statesOptions[2];
    }
  }

  onSelectButton(order: Order){
    if(order.state === 'DELIVERED'){
      order.delivered_at = new Date();
    }
  }

}
