

import { Pipe, PipeTransform } from '@angular/core';
import products from 'src/app/config/products';
import { IProduct } from '../models/IProduct.model';

const PRODUCTS_HOME_NEWS_IDS = products
.sort(function(a, b) {
    return b.id - a.id;
})
.slice(0, 4)
.map(item => item.id);

@Pipe({
  name: 'filterByHomeNews'
})
export class FilterByHomeNewsPipe implements PipeTransform {

  transform(products: IProduct[]): any {
    if(products && products.length > 0){
        return products.filter(product => 
            PRODUCTS_HOME_NEWS_IDS.includes(product.id)   
        );
    } else {
        return [];
    }
  }

}