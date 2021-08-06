import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-ad',
  templateUrl: './header-ad.component.html',
  styleUrls: ['./header-ad.component.less']
})
export class HeaderAdComponent implements OnInit {

  hover = false;

  constructor() { }

  ngOnInit(): void {
  }


  setHover(){ this.hover = true; }
  resetHover(){ this.hover = false; }
}
