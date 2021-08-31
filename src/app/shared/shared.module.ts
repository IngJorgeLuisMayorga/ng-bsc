import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDefaultComponent } from './components/headers/header-default/header-default.component';
import { FooterDefaultComponent } from './components/footers/footer-default/footer-default.component';
import { HeaderAdComponent } from './components/headers/header-ad/header-ad.component';
import { AddMinusButtonComponent } from './components/buttons/add-minus-button/add-minus-button.component';
import { DarkButtonComponent } from './components/buttons/dark-button/dark-button.component';
import { OutlineButtonComponent } from './components/buttons/outline-button/outline-button.component';
import { AddToCardButtonComponent } from './components/buttons/add-to-card-button/add-to-card-button.component';
import { FavButtonComponent } from './components/buttons/fav-button/fav-button.component';
import { PinkButtonComponent } from './components/buttons/pink-button/pink-button.component';


const COMPONENTS = [
  HeaderDefaultComponent,
  FooterDefaultComponent,
  HeaderAdComponent,

  AddMinusButtonComponent,
  DarkButtonComponent,
  PinkButtonComponent,

  OutlineButtonComponent,
  
  AddToCardButtonComponent,
  
  FavButtonComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
