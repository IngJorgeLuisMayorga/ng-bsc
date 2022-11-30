import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { CategoriesService } from 'src/app/core/categories/services/categories.service';
import { Coupon } from 'src/app/core/coupons/coupons.model';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Category, Product } from 'src/app/core/products/models/IProduct.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { UsersService } from 'src/app/core/users/users.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-page-categories',
  templateUrl: './admin-page-categories.component.html',
  styleUrls: ['./admin-page-categories.component.less']
})
export class AdminPageCategoriesComponent implements OnInit {

  categories: Category[] = [];
  loading: boolean = true;

  constructor(private $categories: CategoriesService, private router: Router) { }

  async ngOnInit() {
    this.categories = await this.$categories.getCategories();
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
      return this.categories ? this.first === (this.categories.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.categories ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  getTargetValue($event: any){
    return $event.target.value;
  }

  doOpenEdit(categoryId: number){
    this.router.navigateByUrl('/admin/categories/'+categoryId)
  }

  doOpenAdd(){
    this.router.navigateByUrl('/admin/categories/-1')
  }
}

