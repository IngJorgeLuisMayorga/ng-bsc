import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page.component';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductPageComponent],
  exports: [ProductPageComponent],
  imports: [
    SwiperModule,
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule
  ]
})
export class ProductPageModule { }
