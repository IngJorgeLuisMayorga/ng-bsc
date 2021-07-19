import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';



@NgModule({
  declarations: [SearchSidebarComponent],
  exports: [SearchSidebarComponent],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
