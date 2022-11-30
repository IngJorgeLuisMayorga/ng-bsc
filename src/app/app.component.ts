import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbsService } from './shared/services/breadcrumbs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-bsc';

  constructor(private router: Router, private $breadcrumbs: BreadcrumbsService) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.$breadcrumbs.setBreadcrumbByRoute(val.url)
        window.scroll(0,0);
      }
  });
  }


  ngOnInit(): void {
    this.$breadcrumbs.init()
  }
  
  ngOnDestroy(): void {
    this.$breadcrumbs.destroy()
  }

}
