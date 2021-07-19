import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct.model';

@Pipe({
  name: 'filterByDuo'
})
export class FilterByDuoPipe implements PipeTransform {

  transform(products: IProduct[]): any {
    if(products && products.length > 0){
        return products
        .filter(product => product.isInHome && product.duo);
    } else {
        return [];
    }
  }

}