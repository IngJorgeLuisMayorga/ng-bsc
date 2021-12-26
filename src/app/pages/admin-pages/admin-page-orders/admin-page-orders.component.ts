import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/orders/orders.model';
import { Wishlist } from 'src/app/core/wishlist/Wishlist.model';
import { UsersService } from 'src/app/core/users/users.service';
import { User } from '../../../core/users/user.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page-orders',
  templateUrl: './admin-page-orders.component.html',
  styleUrls: ['./admin-page-orders.component.less']
})
export class AdminPageOrdersComponent implements OnInit {

  public orders: Order[] | null;

  constructor(
    private route: ActivatedRoute, 
    private $user: UsersService,
    private $orders: OrdersService,
    private $wishlist: WishlistService
  ) { }

  async ngOnInit() {
    this.orders = await this.$orders.getAll();
  }

  getInvoicePDF(id: string){
    return environment.server + '/orders/pdf/' + id;
  }

}
