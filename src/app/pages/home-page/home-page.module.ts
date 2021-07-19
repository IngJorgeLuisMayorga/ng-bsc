import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [HomePageComponent],
  exports: [HomePageComponent],
  imports: [
    SwiperModule,
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class HomePageModule { }
