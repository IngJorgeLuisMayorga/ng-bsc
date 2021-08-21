import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routes';
import { HomePageModule } from './home-page/home-page.module';
import { ProductPageModule } from './product-page/product-page.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageModule,
    ProductPageModule,
    RouterModule.forRoot(PagesRoutes, { useHash: false })
  ]
})
export class PagesModule { }
