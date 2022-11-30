import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-layout-basic',
  templateUrl: './layout-basic.component.html',
  styleUrls: ['./layout-basic.component.less']
})
export class LayoutBasicComponent implements OnInit,OnDestroy {

  @Input()
  breadcumbs: Array<{ path: string; text: string }> = [{ text:'Inicio',path: '/'}];

  @Output()
  nBreadcrumbChange = new EventEmitter<{ path: string; text: string }>();

  public wishlist$: Observable<Product[]>;
  public inWishlist$: Observable<boolean>;

  public isCartOpen$ :  Observable<boolean>;
  public cartlist$: Observable<number>;

  public currentPath  = '';


  constructor(
    public $breadcrumbs: BreadcrumbsService,
    public $router: Router,
    public $route: ActivatedRoute,
    public $cart: CartService, 
    public $wishlist: WishlistService, 
    public $products:ProductsService
  ) { 
    this.isCartOpen$ = this.$cart.isOpen$;
    this.wishlist$ = this.$wishlist.sync();
    
  }

  ngOnInit(): void {
    const path = window.location.href.split(window.location.host)[1];
    this.currentPath = path;
    this.$breadcrumbs.setBreadcrumbByRoute(path);
  }

  ngOnDestroy(): void {
  
  }

  public onChangeBreadcrumb(){
    const breadcrumb = this.breadcumbs.find(breadcumb => breadcumb.path === this.currentPath  );
    if(breadcrumb) this.nBreadcrumbChange.emit(breadcrumb);
  }

  public goToBreadcrumb(breadcrumb: { path: string; text: string }){
    this.currentPath = breadcrumb.path;
    this.$breadcrumbs.setBreadcrumbByRoute(breadcrumb.path);
    this.$router.navigateByUrl(breadcrumb.path);
  }





}
