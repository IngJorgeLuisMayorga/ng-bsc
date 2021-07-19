import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart/services/cart.service';
import Products from '../../../app/config/products';
import SwiperCore from 'swiper/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  public products: any[] = [];
  public isCartOpen$ :  Observable<boolean>;
  public swiperTab = 'NEWS';


  public SETTINGS: string[] = [];
  public SETTINGS2: string[] = [];
  
  constructor(private $cart: CartService) { 
    this.isCartOpen$ = this.$cart.isOpen$;
  }

  ngOnInit(): void {
    this.products = Products;
    this.SETTINGS = [];
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
