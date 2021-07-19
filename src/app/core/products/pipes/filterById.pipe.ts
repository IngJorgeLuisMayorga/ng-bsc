

import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct.model';

@Pipe({
  name: 'filterById'
})
export class filterByIdPipe implements PipeTransform {

  transform(products: IProduct[], id: number): any {
    if(products && products.length > 0){
        return products.find(product => product.id === id);
    } else {
        return [];
    }
  }

}