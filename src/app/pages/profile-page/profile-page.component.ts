import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.less']
})
export class ProfilePageComponent implements OnInit {

  public N: number = 10;

  public user$: Observable<User>;
  public order$: Observable<Order>;
  public orders$: Observable<Order[]>;
  
  public tab: number = 0;
  public isThanks  = false;
  public breadcumbs: Array<{ path: string; text: string }> = [];

  constructor(private $users: UsersService, private $orders: OrdersService, private route: ActivatedRoute) {
    this.user$ = this.$users.user$;
    this.order$ = this.$orders.activeOrder$;
    this.orders$ = this.$orders.ordersByUser$;
    this.breadcumbs = [
      {
        text:'Inicio',
        path: '/',
      },
      {
        text:'Mi Cuenta',
        path: '/profile',
      }
    ];
   }

  async ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if(orderId){
      this.isThanks = true;
      this.setTab(1);
      await this.$orders.setActiveOrderById(parseInt(orderId));
      
      setTimeout(() => {
        this.isThanks = false;
      }, 3000);
    }
    const user = await this.$users.auth();
    const orders = await this.$orders.getByUserId(user.id);
  }

  async setTab(tab: number){
    this.tab = tab;
    this.$orders.resetActiveOrder();
    //const user = await this.$users.login();
    //const orders = await this.$orders.getByUserId(user.id);
  }

  goToOrder(id: number){
    this.$orders.setActiveOrderById(id);
  }

  goToNext(id: number){
    this.$orders.setActiveOrderByNextId(id);
  }
  goToBack(id: number){
    this.$orders.setActiveOrderByPrevId(id);
  }

  more(){
    this.N = this.N + 10;
  }

  editUser(){
    
  }

}
