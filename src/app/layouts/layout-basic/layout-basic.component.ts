import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';

@Component({
  selector: 'app-layout-basic',
  templateUrl: './layout-basic.component.html',
  styleUrls: ['./layout-basic.component.less']
})
export class LayoutBasicComponent implements OnInit {

  @Input()
  breadcumbs: Array<{ path: string; text: string }> = [{ text:'Inicio',path: '/'}];

  @Output()
  nBreadcrumbChange = new EventEmitter<{ path: string; text: string }>();

  public wishlist$: Observable<Product[]>;
  public inWishlist$: Observable<boolean>;

  public isCartOpen$ :  Observable<boolean>;
  public cartlist$: Observable<number>;

  public currentPath  = '';


  constructor(private router: Router, private route: ActivatedRoute, private $cart: CartService, private $wishlist: WishlistService, private $products:ProductsService) { 
    this.isCartOpen$ = this.$cart.isOpen$;
    this.wishlist$ = this.$wishlist.sync();
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.currentPath = val.url;
        this.onChangeBreadcrumb();
      }
  });
  }

  ngOnInit(): void {
    this.onChangeBreadcrumb()
  }

  onChangeBreadcrumb(){
    const breadcrumb = this.breadcumbs.find(breadcumb => breadcumb.path === this.currentPath  );
    if(breadcrumb) this.nBreadcrumbChange.emit(breadcrumb);
  }


}
