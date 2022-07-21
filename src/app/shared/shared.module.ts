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
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CartModule } from '../core/cart/cart.module';
import { TabviewComponent } from './components/tabs/tabview/tabview.component';
import { TabPanelComponent } from './components/tabs/tabpanel/tabpanel.component';
import { InputTextBasicComponent } from './components/forms/input-text-basic/input-text-basic.component';
import { InputDateBasicComponent } from './components/forms/input-date-basic/input-date-basic.component';
import { FormBasicComponent } from './components/forms/form-basic/form-basic.component';
import { InputTextPasswordComponent } from './components/forms/input-text-password/input-text-password.component';
import { BtnBasicComponent } from './components/forms/btn-basic/btn-basic.component';
import { InputOptionsBasicComponent } from './components/forms/input-options-basic/input-options-basic.component';


const COMPONENTS = [

  HeaderDefaultComponent,
  FooterDefaultComponent,
  HeaderAdComponent,

  AddMinusButtonComponent,
  DarkButtonComponent,
  PinkButtonComponent,

  OutlineButtonComponent,
  
  AddToCardButtonComponent,
  
  FavButtonComponent,
  TabviewComponent,
  TabPanelComponent,

  BtnBasicComponent,
  InputTextBasicComponent,
  InputDateBasicComponent,
  InputTextPasswordComponent,
  InputOptionsBasicComponent,

  FormBasicComponent

];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
