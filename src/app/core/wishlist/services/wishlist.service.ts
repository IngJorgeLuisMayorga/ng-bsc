import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct } from '../../products/models/IProduct.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private _wishlist: BehaviorSubject<IProduct[]> = new BehaviorSubject(
    [] as IProduct[]
  );
  public wishlist$ = this._wishlist.asObservable();

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject(
    false as boolean
  );
  public isOpen$ = this._isOpen.asObservable();

  private _isUpdating: BehaviorSubject<number> = new BehaviorSubject(
    0 as number
  );
  public isUpdating$ = this._isUpdating.asObservable();

  constructor() {
    this._wishlist.next([]);
    this._isUpdating.next(0);
    this._isOpen.next(false);
  }

  public sync() {
    return this.wishlist$;
  }
  public syncIsUpdating() {
    return this._isUpdating;
  }

  public async addToWishlist(product: IProduct) {
    this._isUpdating.next(product.id);
    let products = JSON.parse(
      JSON.stringify(this._wishlist.getValue() || []) + ''
    );
    let isNewAdd = !products.find(
      (_product: IProduct) => _product.id === product.id
    );
    if (!isNewAdd) {
      products.map((_product: IProduct) => {
        if (product.id === _product.id) {
          if (_product.cart) _product.cart.quantity += 1;
          else _product.cart = { quantity: 1, updated_at: new Date() };
          _product.cart.updated_at = new Date();
        }
      });
    } else {
      products.push({
        ...product,
        ...{ cart: { quantity: 1, updated_at: new Date() } },
      });
    }
    setTimeout(() => {
      this._wishlist.next(products);
      this._isUpdating.next(0);
      return products;
    }, 150);
  }

  public async removeToWishlist(product: IProduct) {
    this._isUpdating.next(product.id);
    let products = JSON.parse(JSON.stringify(this._wishlist.getValue()) + '');
    let productInCart = products.find(
      (_product: IProduct) => _product.id === product.id
    );

    if (productInCart) {
      this._wishlist.next(
        products.find((_product: IProduct) => _product.id !== product.id)
      );
      this._isUpdating.next(0);
    } else {
      this._wishlist.next(
        products.find((_product: IProduct) => _product.id !== product.id)
      );
      this._isUpdating.next(0);
    }
  }

  public async toogleToWishlist(product: IProduct) {
    this._isUpdating.next(product.id);
    let products =
      JSON.parse(JSON.stringify(this._wishlist.getValue() || []) + '') || [];
    if (!products) products = [];

    console.log(' ');
    console.log(' products ');
    console.log(products);
    console.log(' ');
    
    if (products) {
      let productInWishlist = products.find(
        (_product: IProduct) => _product.id === product.id
      );
      if (productInWishlist) {
        await this.removeToWishlist(product);
        this._isUpdating.next(0);
      } else {
        await this.addToWishlist(product);
        this._isUpdating.next(0);
      }
    }
  }
}
