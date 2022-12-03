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
import { FormsModule } from '@angular/forms';
import { CartModule } from './cart/cart.module';
import { ProfileModule } from './profile/profile.module';
import { ProductItemComponent } from './products/components/product-item/product-item.component';
import { OrdersModule } from './orders/orders.module';


const COMPONENTS = [
  SearchSidebarComponent, 
  ProductCardComponent,
  ProductDuoCardComponent,
  ProductRecommendedCardComponent,
  ProductItemComponent
]

const PIPES = [
  FilterByHomeCardsPipe,
  FilterByHomeNewsPipe,
  FilterByHomeFavsPipe,
  FilterByDuoPipe,
  filterByIdPipe
]

const MODULES = [
  CartModule,
    ProfileModule,
    OrdersModule,
]

@NgModule({
  declarations: [...COMPONENTS, ...PIPES ],
  exports: [...COMPONENTS, ...PIPES, ...MODULES],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ...MODULES
  ]
})
export class CoreModule { }
