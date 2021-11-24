import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Category, Product } from './models/IProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private $http: HttpClient) { }

  async getProducts(): Promise<Product[]> {
    const products = await this.$http.get<Product[]>(`${environment.server}/products`).toPromise();
    products.map((product: Product) => {
      product.category_skin = product.category_skin_id as any;
      product.category_main_ingredient = product.category_main_ingredient_id as any;
      product.category_solution = product.category_solution_id as any;
      product.category_step = product.category_step_id as any;
      product.category_brand = product.category_brand_id as any;

      product.category_skin.picture_normal = `${environment.server}` + (product.category_skin as Category).picture_normal;
      product.category_main_ingredient.picture_normal = `${environment.server}` + (product.category_main_ingredient as Category).picture_normal;
      product.category_solution.picture_normal = `${environment.server}` + (product.category_solution as Category).picture_normal;
      product.category_step.picture_normal = `${environment.server}` + (product.category_step as Category).picture_normal;

      return product;
    });
    return products;
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.$http.get<Product>(`${environment.server}/products/${id}`).toPromise();
    return product;
  }

}
