import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';
import { ProductsService } from 'src/app/core/products/products.service';
import { Product } from 'src/app/core/products/models/IProduct.model';


@Component({
  selector: 'app-admin-page-products',
  templateUrl: './admin-page-products.component.html',
  styleUrls: ['./admin-page-products.component.less']
})
export class AdminPageProductsComponent implements OnInit {

  products: Product[];
  loading: boolean = true;

  constructor(private $products: ProductsService, private router: Router) { }

  async ngOnInit() {
    this.products = await this.$products.getProducts();
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
      return this.products ? this.first === (this.products.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.products ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  getTargetValue($event: any){
    return $event.target.value;
  }

  doOpenEdit(userId: number){
    this.router.navigateByUrl('/admin/products/'+userId)
  }

  doOpenAdd(){
    this.router.navigateByUrl('/admin/products/-1')
  }
  
  doUploadCSV(){
    this.router.navigateByUrl('/admin/products/-1')
  }


  nChangeVisible(product: Product){

    const _product =  {
      ...product,
      visible: (product.visible) ? 1 : 0
    };

    const _product_category_main_ingredient_id = ((product.category_main_ingredient_id as any).id);
    const _product_category_skin_id = ((product.category_skin_id as any).id);
    const _product_category_solution_id = ((product.category_solution_id as any).id);
    const _product_category_step_id = ((product.category_step_id as any).id);
    const _product_category_extra_id = ((product.category_extra_id as any).id);

    _product.category_main_ingredient_id = _product_category_main_ingredient_id + 0;
    _product.category_skin_id = _product_category_skin_id + 0;
    _product.category_solution_id = _product_category_solution_id + 0;
    _product.category_step_id = _product_category_step_id + 0;
    _product.category_extra_id = _product_category_extra_id + 0;
    _product.category_brand_id = _product.category_brand_id ? (_product.category_brand_id as any).id : 0;
    
    // const _product_category_brand_id = ((product.category_brand_id as any).id);
    // _product.category_brand_id = _product_category_brand_id + 0;
  
    this.$products.saveProduct(product.id, _product)
  }
}
