import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Coupon } from './coupons.model';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private $http: HttpClient) { }

  async getCoupons(): Promise<Coupon[]> {
    const _coupon = await this.$http.get<Coupon[]>(`${environment.server}/coupons`).toPromise();
    return _coupon;
  }

  async getCouponById(id: number): Promise<Coupon> {
    const _coupon = await this.$http.get<Coupon>(`${environment.server}/coupons/${id}`).toPromise();
    return _coupon;
  }

  async save(coupon: Coupon, id: number): Promise<Coupon> {
    if(id === -1){
      const _coupon = await this.$http.post<Coupon>(`${environment.server}/coupons`, coupon).toPromise();
      return _coupon;
    } else {
      const _coupon = await this.$http.patch<Coupon>(`${environment.server}/coupons/${id}`, coupon).toPromise();
      return _coupon;
    }
  }

}

