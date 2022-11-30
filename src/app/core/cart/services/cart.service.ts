import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon } from '../../coupons/coupons.model';
import { Product } from '../../products/models/IProduct.model';
export interface IShippingStore {
  city: "NONE" | "BOG" | "OTHER";
  hasCoupon: boolean;
  value: 0
}
const DefaultShippingStore:IShippingStore = {
  city:'NONE',
  hasCoupon: false,
  value: 0,
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart: BehaviorSubject<Product[]> = new BehaviorSubject([] as Product[])
  public cart$ = this._cart.asObservable();

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean)
  public isOpen$ = this._isOpen.asObservable();

  private _isUpdating: BehaviorSubject<number> = new BehaviorSubject(0 as number)
  public isUpdating$ = this._isUpdating.asObservable();

  
  private _coupon: BehaviorSubject<Coupon> = new BehaviorSubject(null)
  public coupon$ = this._coupon.asObservable();
  public isCoupon$ = this._coupon.asObservable();

  private _shipping: BehaviorSubject<IShippingStore> = new BehaviorSubject(DefaultShippingStore);
  public shipping$ = this._shipping.asObservable();

  constructor() { 
    this._cart.next([]);
    this._isUpdating.next(0);
    this._isOpen.next(false);
    this._shipping.next(DefaultShippingStore);
  }

  public initLoad(){
    if(this.isCartEmpty()){
      const productsStr = localStorage.getItem('cart');
      if(productsStr) {
        const products = JSON.parse(productsStr)
        if(products && products.length > 0){
          this._cart.next(products);
        }
      }
    }
  }

  public isCartEmpty(){
    return this._cart.getValue().length === 0;
  }

  public sync(){
    return this.cart$.pipe(
      map((products: Product[]) => {
        return products
      })
    );
  }

  public syncCartSize(){
    return this.sync().pipe(
      map((products: Product[]) => {
        let cartSize = 0;
        for(let k = 0 ; k < products.length ; k++){
          const product = products[k].cart;
          if(product) {
            if(product.quantity) cartSize = cartSize + product.quantity;
          }
        }
        return cartSize;
      })
    );
  }
  public syncCartTotal(){
    return this.sync().pipe(
      map((products: Product[]) => {
        let cartSize = 0;
        for(let k = 0 ; k < products.length ; k++){
          const product = products[k].cart;
          const price = products[k].price * (1 - 0.01*products[k].discount);
          if(product) {
            if(product.quantity) cartSize = cartSize + price * product.quantity;
          }
        }
        return cartSize;
      })
    );
  }
  
  public applyCoupon(cartTotal: number){

    if(this._coupon.getValue()){
      console.error(' ')
      console.error(' public applyCoupon(cartTotal: number) ')
      console.error(cartTotal)
      console.error(this._coupon.getValue())
      console.error((this._coupon.getValue().type === 'BY_TOTAL_BIGGER'))
      console.error(' ')
    }

    if(this._coupon.getValue()){
    
      if(this._coupon.getValue().type === 'BY_PRODUCT'){
        return cartTotal;
      }
      
      else if(this._coupon.getValue().type === 'BY_TOTAL_BIGGER'){
        const trigger = cartTotal > this._coupon.getValue().variable_give_discount_amount;
        const amount = this._coupon.getValue().variable_give_discount_amount;
        const percetange = this._coupon.getValue().variable_give_discount_percentage;
        const freeshipping = this._coupon.getValue().free_shipping;
        console.error({
          amount,percetange,freeshipping, trigger
        })
        if(amount && trigger) return cartTotal - amount;
        if(percetange && trigger) return cartTotal*(1 - 0.01*percetange);
        if(freeshipping && trigger) return cartTotal;
      }

      else if(this._coupon.getValue().type === 'BY_BRAND'){
        return cartTotal;
      }

      else if(this._coupon.getValue().type === 'BY_FIRST_N'){
        return cartTotal;
      }

      else if(this._coupon.getValue().type === 'BY_2_PRODUCTS_SAME_BRAND'){
        return cartTotal;
      } 

      else {
        return cartTotal;
      }

    } else {
      return cartTotal;
    }

    return cartTotal;

  }

  public syncCartSizeDebugger(){
    return this.sync();
  }

  public syncIsUpdating(){
    return this._isUpdating;
  }

  public async addToCart(product: Product){

    this._isUpdating.next(product.id);
    let products = JSON.parse(JSON.stringify(this._cart.getValue()) + '')
    let isNewAdd = !products.find((_product: Product) => _product.id === product.id);
    if(!isNewAdd){
      products.map((_product: Product) => {
        if(product.id === _product.id){
          
          if(_product.cart) _product.cart.quantity += 1;  
          else _product.cart = { quantity: 1, updated_at: new Date()}
          _product.cart.updated_at = new Date();

        }
      });
    } else {
      products.push({...product, ...{cart:{ quantity: 1, updated_at: new Date()}}});
    }
    setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(products));
      this._cart.next(products);
      this._isUpdating.next(0);
      return products;
    }, 1000)

  }

  public setCart(products: Product[]){
    this._cart.next(products);
    this._isUpdating.next(0);
  }

  
  public getCart(){
    return this._cart.getValue();
  }

  public async removeToCart(product: Product){


    this._isUpdating.next(product.id);
    let products = JSON.parse(JSON.stringify(this._cart.getValue()) + '')
    let productInCart = products.find((_product: Product) => _product.id === product.id);
   
    if(productInCart){
      if(productInCart.cart.quantity > 0){
        productInCart.cart.quantity -= 1;
      } else {
        productInCart = null;
      }
    }

    products = [...new Set([...[productInCart], ...products])];
    setTimeout(() => {
      this._cart.next(products)
      this._isUpdating.next(0);
      localStorage.setItem('cart', JSON.stringify(products));
      return products;
    }, 1000)
 
  }
  public async removeAllToCart(product: Product){
    
    this._isUpdating.next(product.id);
    let products = JSON.parse(JSON.stringify(this._cart.getValue()) + '')
    let productInCart = products.find((_product: Product) => _product.id === product.id);
   
    if(productInCart){
      if(productInCart.cart.quantity > 0){
        productInCart.cart.quantity = 0;
      } else {
        productInCart = null;
      }
    }

    products = [...new Set([...[productInCart], ...products])];
    setTimeout(() => {
      this._cart.next(products)
      this._isUpdating.next(0);
      localStorage.setItem('cart', JSON.stringify(products));
      return products;
    }, 1000)
 
  }

  doOpenCart(){
    this._isOpen.next(true)
  }

  doCloseCart(){
    this._isOpen.next(false)
  }

  doToogleCart(){
    if(!this._isOpen.getValue()) this.doOpenCart();
    else this.doCloseCart()
  }

  setCoupon(coupon: Coupon){
    this._coupon.next(coupon);
    this._cart.next(JSON.parse(JSON.stringify(this._cart.getValue())));
  }


  syncShippingValue(){
    return this.shipping$.pipe(
      map(shipping=> shipping.value)
    )
  }

  syncShippingStatus(): Observable<'pending' | 'free_by_coupon' | 'free_by_300k' | 'valued'> {
    return this.shipping$.pipe(
      map(shipping=> {
        if(shipping.city === 'NONE'){
          return 'pending';
        } else {
          if(shipping.hasCoupon){
            return 'free_by_coupon';
          } else {
            if(shipping.value > 0){
              return 'free_by_300k';
            } else {
              return 'valued';
            }
          }
        }
      })
    )
  }


}
