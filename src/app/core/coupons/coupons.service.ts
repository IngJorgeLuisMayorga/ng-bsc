import { Injectable } from '@angular/core';
import { Coupon } from './coupons.model';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor() { }

  async getCoupons(): Promise<Coupon[]> {
    return [];
  }
}
