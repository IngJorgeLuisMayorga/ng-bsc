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

  async getProductsVisible(): Promise<Product[]> {
    const products = await this.$http.get<Product[]>(`${environment.server}/products/visible`).toPromise();
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
  async getProductsRecommended(product: Product): Promise<Product[]> {
    const products = await this.$http.get<Product[]>(`${environment.server}/products/recommended/${product.id}`).toPromise();
    products.map((_product: Product) => {
      _product.category_skin = _product.category_skin_id as any;
      _product.category_main_ingredient = _product.category_main_ingredient_id as any;
      _product.category_solution = _product.category_solution_id as any;
      _product.category_step = _product.category_step_id as any;
      _product.category_brand = _product.category_brand_id as any;
      return _product;
    });

    console.error(' ')
    console.error('getProductsRecommended  ')
    console.error(products)

    return products;
  }

  async saveProduct(id: number, product: Product){
    const myFormData = new FormData();
    myFormData.append('image1', (product as any).image1_src_blob);
    myFormData.append('image2', (product as any).image2_src_blob);
    myFormData.append('image3', (product as any).image3_src_blob);
    myFormData.append('image4', (product as any).image4_src_blob);
    myFormData.append('product', product.id + '');
    
    let pictures = {
      'image1': '',
      'image2': '',
      'image3': '',
      'image4': '',
    }
    if((product as any).image1_src_blob || (product as any).image2_src_blob  || (product as any).image3_src_blob || (product as any).image4_src_blob){
      const _pictures = await this.$http.post<any>(`${environment.server}/products/upload/picture`, myFormData).toPromise();
      pictures = _pictures;
      if(pictures.image1) product.image1_src = `${environment.server}/images/${pictures.image1}`;
      if(pictures.image2) product.image2_src = `${environment.server}/images/${pictures.image2}`;
      if(pictures.image3) product.image3_src = `${environment.server}/images/${pictures.image3}`;
      if(pictures.image4) product.image4_src = `${environment.server}/images/${pictures.image4}`;
    }

    const _product = await this.$http.patch<Product>(`${environment.server}/products/${id}`, product).toPromise();
    return _product;
  }

}
