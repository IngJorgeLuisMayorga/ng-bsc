import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutBasicComponent } from './layout-basic/layout-basic.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LayoutBasicComponent],
  exports: [LayoutBasicComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CoreModule,
    SharedModule
  ]
})
export class LayoutsModule { }
