import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { LayoutBasicComponent } from 'src/app/layouts/layout-basic/layout-basic.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfilePageComponent,
      
  ],
  exports: [
    ProfilePageComponent,
     
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoreModule,
    LayoutsModule
  ]
})
export class ProfilePageModule { }
