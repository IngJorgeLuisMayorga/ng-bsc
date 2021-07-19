import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDefaultComponent } from './components/headers/header-default/header-default.component';
import { FooterDefaultComponent } from './components/footers/footer-default/footer-default.component';
import { HeaderAdComponent } from './components/headers/header-ad/header-ad.component';


const COMPONENTS = [
  HeaderDefaultComponent,
  FooterDefaultComponent,
  HeaderAdComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
