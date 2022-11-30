import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { ProductsService } from 'src/app/core/products/products.service';
import { UsersService } from 'src/app/core/users/users.service';
import { User } from 'src/app/core/users/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.less']
})
export class HomePageComponent implements OnInit {

  // Observables RXJS Data
  public user$: Observable<User>;
  public isCartOpen$ :  Observable<boolean>;

  //
  public products: any[] = [];
  public swiperTab = 'NEWS';

  //
  public SETTINGS: string[] = [];
  public SETTINGS2: string[] = [];
  
  constructor(private $cart: CartService, private $products: ProductsService, private $user: UsersService) { 
    this.user$ = this.$user.user$;
    this.isCartOpen$ = this.$cart.isOpen$;
  }

  async ngOnInit() {
    // this.products = Products;
    this.products = await this.$products.getProductsVisible();
    this.SETTINGS = [];
  }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
