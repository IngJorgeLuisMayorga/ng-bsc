import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Coupon } from 'src/app/core/coupons/coupons.model';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { UsersService } from 'src/app/core/users/users.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-page-coupons',
  templateUrl: './admin-page-coupons.component.html',
  styleUrls: ['./admin-page-coupons.component.less']
}) 
export class AdminPageCouponsComponent implements OnInit {

  products: Product[] = [];
  coupons: Coupon[];
  loading: boolean = true;

  constructor(private $coupons: CouponsService, private router: Router) { }

  async ngOnInit() {
    this.coupons = await this.$coupons.getCoupons();
    this.loading = false;
  }

  first = 0;

  rows = 10;

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.coupons ? this.first === (this.coupons.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.coupons ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  getTargetValue($event: any){
    return $event.target.value;
  }

  doOpenEdit(userId: number){
    this.router.navigateByUrl('/admin/coupons/'+userId)
  }

  doOpenAdd(){
    this.router.navigateByUrl('/admin/coupons/-1')
  }
}
