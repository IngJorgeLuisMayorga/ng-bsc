import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSidebarComponent } from './cart/components/cart-sidebar/cart-sidebar.component';
import { ProductCardComponent } from './products/components/product-card/product-card.component';
import { ProfileSidebarComponent } from './profile/profile-sidebar/profile-sidebar.component';
import { SearchSidebarComponent } from './search/components/search-sidebar/search-sidebar.component';
import { FilterByHomeCardsPipe } from './products/pipes/filterByHomeCards.pipe';
import { ProductDuoCardComponent } from './products/components/product-duo-card/product-duo-card.component';
import { FilterByDuoPipe } from './products/pipes/filterByDuo.pipe';
import { filterByIdPipe } from './products/pipes/filterById.pipe';
import { FilterByHomeNewsPipe } from './products/pipes/filterByHomeNews.pipe';
import { FilterByHomeFavsPipe } from './products/pipes/filterByHomeFavs.pipe';
import { ProductRecommendedCardComponent } from './products/components/product-recommended-card/product-recommended-card.component';
import { SharedModule } from '../shared/shared.module';


const COMPONENTS = [
  CartSidebarComponent,
  ProfileSidebarComponent,
  SearchSidebarComponent, 
  ProductCardComponent,
  ProductDuoCardComponent,
  ProductRecommendedCardComponent
]

const PIPES = [
  FilterByHomeCardsPipe,
  FilterByHomeNewsPipe,
  FilterByHomeFavsPipe,
  FilterByDuoPipe,
  filterByIdPipe
]

@NgModule({
  declarations: [...COMPONENTS, ...PIPES ],
  exports: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoreModule { }
