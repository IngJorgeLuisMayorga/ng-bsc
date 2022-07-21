import { Component, ContentChildren, QueryList, AfterContentInit, OnInit } from '@angular/core';

import { TabPanelComponent } from '../tabpanel/tabpanel.component';
@Component({
  selector: 'app-tabView',
  templateUrl: './tabview.component.html',
  styleUrls: ['./tabview.component.less']
})
export class TabviewComponent implements OnInit, AfterContentInit  {

  @ContentChildren(TabPanelComponent) tabs: QueryList<TabPanelComponent>;


  constructor() { }

  ngOnInit(): void {
    
  }

  select(tab: TabPanelComponent) {
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
  }

  ngAfterContentInit() {

    let actives = this.tabs.filter((tab) => tab.active);
    
    if(actives.length === 0) 
      this.select(this.tabs.first);
    
  }


  isColorYellow(tab: TabPanelComponent){
    return tab.color.includes('yellow');
  }
  isColorBlue(tab: TabPanelComponent){
    return tab.color.includes('blue');
  }

}
