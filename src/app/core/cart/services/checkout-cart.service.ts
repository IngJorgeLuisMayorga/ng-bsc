import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICheckoutCart, ICheckoutProduct } from 'src/app/pages/checkout-page/models/checkout-cart.model';
import { IProduct, Product } from '../../products/models/IProduct.model';
import { UsersService } from '../../users/users.service';
import { CartService } from './cart.service';

const MAX_SHIPPING = 300000;
const TAX = 0.19;

@Injectable({
  providedIn: 'root'
})
export class CheckoutCartService {

  public checkoutCart$: Observable<ICheckoutCart>;

  private _checkoutShipping: BehaviorSubject<{ data: any; value: number; coupon: any; }> = new BehaviorSubject({ data: null, value: 0, coupon: null});
  public checkoutShipping$: Observable<{ data: any; value: number; coupon: any; }> = this._checkoutShipping.asObservable();

  constructor(private cart$: CartService, private $user: UsersService) { 
    this.checkoutCart$ = combineLatest([this.cart$.sync(), this.checkoutShipping$, this.$user.user$]).pipe(
      map(([cart$, shipping$, user$]) => {
        const products = cart$.map((item: Product): ICheckoutProduct => {
          return {
            id: item.id,
            photo: item.image1_src,
            title: item.name,
            description: item.description,
            brand: item.brand,
            quantity: item.cart?.quantity,
            price: item.price,
            discount: item.discount,
            total: item.cart?.quantity*(1 - 0.01*item.discount)*(item.price)
          }
        });
        const total = [...products.map(item => item.total), ...[]].reduce((total: number, item: number) => total + item, 0);
        const isFree = (total > MAX_SHIPPING);
        return {
          user: {  
            id: user$ ? user$.id : 0,
            email: user$ ? user$.email : '',
            points: user$ ? user$.points || 0 : 0,
            nid_number:  user$ ? user$.nid_number : '',
            nid_type:  user$ ? user$.nid_type : '',
            name:  user$ ? user$.name : '',
            first_name:  user$ ? user$.first_name : '',
            last_name: user$ ? user$.last_name : '',
            address: user$ ? user$.address : ''
          },
          coupon:{},
          products: products,
          shipping: {
            data: shipping$.data,
            value: shipping$.value,
            isFree: isFree,
            isPending: !(shipping$.data),
            isFreeByCoupon: shipping$.coupon,
            missingToFree: MAX_SHIPPING - total
          },
          total: total,
          taxes: total*TAX,
          subtotal: total*(1 - TAX),
        }
      })
    )
  }

  setShipping(data: any, value: number, coupon: any){
    this._checkoutShipping.next({data: data, value: value, coupon: coupon});
  }





}

