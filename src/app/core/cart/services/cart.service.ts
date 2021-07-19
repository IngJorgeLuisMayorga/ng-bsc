import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../../products/models/IProduct.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart: BehaviorSubject<IProduct[]> = new BehaviorSubject([] as IProduct[])
  public cart$ = this._cart.asObservable();

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean)
  public isOpen$ = this._isOpen.asObservable();

  private _isUpdating: BehaviorSubject<number> = new BehaviorSubject(0 as number)
  public isUpdating$ = this._isUpdating.asObservable();

  constructor() { 
    this._cart.next([]);
    this._isUpdating.next(0);
    this._isOpen.next(false);
  }

  public sync(){
    return this.cart$;
  }

  public syncCartSize(){
    return this.cart$.pipe(
      map((products: IProduct[]) => {
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
    return this.cart$.pipe(
      map((products: IProduct[]) => {
        let cartSize = 0;
        for(let k = 0 ; k < products.length ; k++){
          const product = products[k].cart;
          const price = products[k].price * (1 - products[k].discount);
          if(product) {
            if(product.quantity) cartSize = cartSize + price * product.quantity;
          }
        }
        return cartSize;
      })
    );
  }

  public syncCartSizeDebugger(){
    return this.cart$;
  }

  public syncIsUpdating(){
    return this._isUpdating;
  }

  public async addToCart(product: IProduct){

    this._isUpdating.next(product.id);
    let products = JSON.parse(JSON.stringify(this._cart.getValue()) + '')
    let isNewAdd = !products.find((_product: IProduct) => _product.id === product.id);
    if(!isNewAdd){
      products.map((_product: IProduct) => {
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
      this._cart.next(products)
      this._isUpdating.next(0);
      return products;
    }, 1000)

  }

  public async removeToCart(product: IProduct){


    this._isUpdating.next(product.id);
    let products = JSON.parse(JSON.stringify(this._cart.getValue()) + '')
    let productInCart = products.find((_product: IProduct) => _product.id === product.id);
   
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
      return products;
    }, 1000)
 
  }
  public async removeAllToCart(product: IProduct){


    this._isUpdating.next(product.id);
    let products = JSON.parse(JSON.stringify(this._cart.getValue()) + '')
    let productInCart = products.find((_product: IProduct) => _product.id === product.id);
   
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
}
