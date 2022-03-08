import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.less']
})
export class FavButtonComponent implements OnInit {

 
  @Input()
  product: Product;

  public inWishlist$: Observable<boolean>;

  constructor(private $wishlist: WishlistService) { 

    
    this.inWishlist$ = this.$wishlist.sync().pipe(
      map((products: Product[]) => 
        {
          if((products && products.length > 0 && products.find(product => product.id === this.product.id))){
            return true;
          } else {
            return false;
          }
        }
      )
    )

  }

  ngOnInit(): void {
  }

  doClick(){
    
  }

  async toogleToWishlist(){
    const product = JSON.parse(JSON.stringify(this.product) + '');
    this.$wishlist.toogleToWishlist(product);
  }
  
  doClickAddFavorites(){}
  doClickRemoveFavorites(){}
}
