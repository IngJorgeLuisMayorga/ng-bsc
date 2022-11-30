
import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct.model';

@Pipe({
  name: 'filterByHomeCards'
})
export class FilterByHomeCardsPipe implements PipeTransform {

  transform(products: IProduct[]): any {
    if(products && products.length > 0){
        return products.sort(() => 0.5 - Math.random()).slice(0, 3);
    } else {
        return [];
    }
  }

  /*
    transform(products: IProduct[]): any {
      if(products && products.length > 0){
          return products.filter(product => product.isInHome && !product.duo);
      } else {
          return [];
      }
    }
  */

}