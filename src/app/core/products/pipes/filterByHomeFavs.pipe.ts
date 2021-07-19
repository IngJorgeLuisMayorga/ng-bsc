

import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct.model';

const PRODUCTS_HOME_FAVS_IDS = [
    1,2,3,7
];

@Pipe({
  name: 'filterByHomeFavs'
})
export class FilterByHomeFavsPipe implements PipeTransform {

  transform(products: IProduct[]): any {
    if(products && products.length > 0){
        return products.filter(product => 
            PRODUCTS_HOME_FAVS_IDS.includes(product.id)   
        );
    } else {
        return [];
    }
  }

}