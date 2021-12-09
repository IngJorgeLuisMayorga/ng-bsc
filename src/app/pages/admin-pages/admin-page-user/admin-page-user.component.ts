
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/orders/orders.model';
import { Wishlist } from 'src/app/core/wishlist/Wishlist.model';
import { UsersService } from 'src/app/core/users/users.service';
import { User } from '../../../core/users/user.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';

interface NID_Type {
  name: string,
  code: string
}

@Component({
  selector: 'app-admin-page-user',
  templateUrl: './admin-page-user.component.html',
  styleUrls: ['./admin-page-user.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminPageUserComponent implements OnInit {

  private userId: number | null;

  public user: User | null;
  public orders: Order[] | null;
  public wishlist: Wishlist[] | null;

  public nid_types:string[] = ['CC','TI','PA', 'CI']
  public nid_type:string = this.nid_types[0];

  constructor(
    private route: ActivatedRoute, 
    private $user: UsersService,
    private $orders: OrdersService,
    private $wishlist: WishlistService
    ) { }

  async ngOnInit() {

    this.userId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if(this.userId !== -1){
      this.user = await this.$user.getUser(this.userId);
      this.orders = await this.$orders.getByUserId(this.userId);
      this.wishlist = await this.$wishlist.getByUserId(this.userId);

    }else {
      this.user = {
          id: -1,
          name: '',
          email: '',
          nid_type: '',
          nid_number: '',
          nid: '',
          birthdate: null,
          points: 0,
          photo: '',
          phone: '',
          city: 'Bogotá',
          address: '',
          cart: [],
          whislist: [],
          orders: [],
          signin_at: new Date(),
          password: '',
          created_at: new Date(),
          updated_at: new Date()
      }
    }


  }

}
