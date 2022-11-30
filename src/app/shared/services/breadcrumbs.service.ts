import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface IBreadcrumb { 
  path: string; 
  text: string 
}


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  public _breadcrumbs: BehaviorSubject<IBreadcrumb[]> = new BehaviorSubject([]);
  public breadcrumbsObs: Observable<IBreadcrumb[]> = this._breadcrumbs.asObservable();
  public breadcrumbsSubs: Subscription;
  
  public _breadcrumb: BehaviorSubject<IBreadcrumb> = new BehaviorSubject(null);
  public breadcrumbObs: Observable<IBreadcrumb> = this._breadcrumb.asObservable();
  public breadcrumbSubs: Subscription;

  public events$: Subscription;

  constructor(public router: Router, public route: ActivatedRoute) { }

  init(){
    this.events$ = this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.setBreadcrumbByRoute(val.url)
      }
    });
  }
  destroy(){
    if(this.events$) this.events$.unsubscribe();
  }

  setBreadcrumbByRoute(route: string){

    const breadcrumbs = this.getBreadcrumbs();
    const breadcrumb = breadcrumbs.find(breadcumb => breadcumb.path === route  );
    if(!breadcrumb) throw 'No Breadcrumb find in setBreadcrumbByRoute';
    this.setBreadcrumb(breadcrumb);
  }

  setBreadcrumbs(breadcrumbs: IBreadcrumb[]){
    this._breadcrumbs.next(breadcrumbs);
  }
  getBreadcrumbs(): IBreadcrumb[]{
    return this._breadcrumbs.getValue();
  }
  setBreadcrumb(breadcrumb: IBreadcrumb){
    this._breadcrumb.next(breadcrumb);
  }
  getBreadcrumb(): IBreadcrumb{
    return this._breadcrumb.getValue();
  }
  nextBreadcrumb(){
    const breadcrumbs = this.getBreadcrumbs();
    const breadcrumb = this.getBreadcrumb();
    const i = breadcrumbs.findIndex(item => item.path === breadcrumb.path);
    let next = null;
    if(i + 1 === breadcrumbs.length){
      next = breadcrumbs[breadcrumbs.length - 1];
    } else {
      next = breadcrumbs[i + 1];
    }
    this.setBreadcrumb(next);
    this.router.navigateByUrl(next.path);
  }
  prevBreadcrumb(){
    console.log(' prev ')
  }


}
