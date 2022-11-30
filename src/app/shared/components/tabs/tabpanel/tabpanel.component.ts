import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabPanel',
  templateUrl: './tabpanel.component.html',
  styleUrls: ['./tabpanel.component.less']
})
export class TabPanelComponent implements OnInit {

  @Input() active: boolean;
  @Input() title: string;
  @Input() color: string = 'blue';

  constructor() { }

  ngOnInit(): void {
  }

}
