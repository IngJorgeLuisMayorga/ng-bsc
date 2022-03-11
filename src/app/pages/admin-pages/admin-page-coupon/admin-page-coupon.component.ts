import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import products from 'src/app/config/products';
import { CategoriesService } from 'src/app/core/categories/services/categories.service';
import { Coupon, NULL_COUPON } from 'src/app/core/coupons/coupons.model';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Category, Product } from 'src/app/core/products/models/IProduct.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { Wishlist } from 'src/app/core/wishlist/Wishlist.model';

@Component({
  selector: 'app-admin-page-coupon',
  templateUrl: './admin-page-coupon.component.html',
  styleUrls: ['./admin-page-coupon.component.less']
})
export class AdminPageCouponComponent implements OnInit {

  public thumb = 0;
  private couponId: number | null;

  public coupon: Coupon | null;
  public orders: Order[] | null;
  public wishlist: Wishlist[] | null;

  public nid_types:string[] = ['CC','TI','PA', 'CI']
  public nid_type:string = this.nid_types[0];

  public productType: any = null;
  
  public productA: any = null;
  public productB: any = null;
  public productC: any = null;

  public products: Product[] = [];
  public brands: string[] = [];

  public from_date = '2022-03-10';

  public checked = false;
  public couponTypes = [
    'BY_PRODUCT', 
    'BY_TOTAL_BIGGER', 
    'BY_BRAND',
    'BY_FIRST_N',
    'BY_2_PRODUCTS_SAME_BRAND'
  ];
  public couponType = this.couponTypes[0];
  public couponFreeShipping = false;

  constructor(
    private route: ActivatedRoute, 
    private $product: ProductsService,
    private $coupons: CouponsService,
    private sanitizer: DomSanitizer
    ) { }

  async ngOnInit() {

    this.couponId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.products = await this.$product.getProducts();
    this.brands = [...this.products.filter((product: Product) => product.category_brand).map((product: Product) => product.category_brand.name)];

    if(this.couponId !== -1){
      this.coupon = await this.$coupons.getCouponById(this.couponId);
      this.couponType = this.coupon.type;
      this.couponFreeShipping = this.coupon.free_shipping || this.coupon.variable_give_free_shipping;
      this.coupon.discount_amount = this.coupon.variable_give_discount_amount;
      this.coupon.discount_percentage = this.coupon.variable_give_discount_percentage;

      const _from_date = new Date(this.coupon.from_date) as Date;
      const _to_date = new Date(this.coupon.to_date) as Date;

      this.coupon.to_date = (_to_date).toISOString().split('T')[0] as string;
      this.coupon.from_date = (_from_date).toISOString().split('T')[0]  as string;

    }else {
      this.coupon = NULL_COUPON;
    }

  }

  showPreview(event: any, thumb: number){
    if(event.target.files.length > 0){
      
      const product_thumb_index = (thumb as number + 1);
      const product_thumb_varname ='image'+product_thumb_index+'_src';

      const src = URL.createObjectURL(event.target.files[0]);
      const preview:HTMLImageElement = document.getElementById("file-ip-"+product_thumb_index+"-preview") as HTMLImageElement;
      //preview.src = src;
      //preview.style.display = "block";

      let objectURL = URL.createObjectURL(event.target.files[0]);       
      const image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      (this.coupon as any)[product_thumb_varname] = image;
      (this.coupon as any)[product_thumb_varname+'_blob'] = event.target.files[0]; 
    }
  }

  nChangeDuo($event: any){
    if(this.checked){

    } else {

    }
  }

  async save(){
      const pre_coupon = JSON.parse(JSON.stringify(this.coupon));
      const coupon: Coupon = {
        ...pre_coupon,
        type: this.couponType,
        free_shipping: this.couponFreeShipping,
        variable_give_free_shipping: this.couponFreeShipping,
        variable_give_discount_percentage: this.coupon.discount_percentage,
        variable_give_discount_amount: this.coupon.discount_amount,
        kpop: 'Blackpink'
      };


      console.warn(' ')
      console.warn('   async save(){ ')
      console.warn(coupon)
      console.warn(' ')

      const _coupon = await this.$coupons.save(JSON.parse(JSON.stringify(coupon) + ''), this.couponId);
      return _coupon;
  }


}
