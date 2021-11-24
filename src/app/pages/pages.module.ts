import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routes';
import { HomePageModule } from './home-page/home-page.module';
import { ProductPageModule } from './product-page/product-page.module';
import { AdminPagesModule } from './admin-pages/admin-pages.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageModule,
    ProductPageModule,
    AdminPagesModule,
    RouterModule.forRoot(PagesRoutes, { useHash: false })
  ]
})
export class PagesModule { }
