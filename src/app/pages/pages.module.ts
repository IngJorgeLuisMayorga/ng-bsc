import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routes';
import { HomePageModule } from './home-page/home-page.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageModule,
    RouterModule.forRoot(PagesRoutes, { useHash: false })
  ]
})
export class PagesModule { }
