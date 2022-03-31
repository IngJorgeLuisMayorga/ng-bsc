import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct } from 'src/app/core/products/models/IProduct.model';

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.less']
})
export class HeaderDefaultComponent implements OnInit {

  public cartSize$: Observable<number>;
  public cart$: Observable<any>;

  constructor(
    private router: Router,
    private $cart: CartService) { 
    this.cart$ = this.$cart.sync();
    this.cartSize$ = this.$cart.syncCartSize();
  }

  ngOnInit(): void {
  }
  
  goHome(){
    this.router.navigateByUrl('/');
  }

  doOpenSearchSidebar(){

  }
  doOpenProfileSidebar(){

  }

  doOpenCartSidebar(){
    this.$cart.doToogleCart();
  }

}
