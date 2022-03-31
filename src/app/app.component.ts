import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng-bsc';

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        window.scroll(0,0);
      }
  });
  }

}
