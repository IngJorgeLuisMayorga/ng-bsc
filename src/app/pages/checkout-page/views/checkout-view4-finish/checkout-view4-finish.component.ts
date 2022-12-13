import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutCartService } from 'src/app/core/cart/services/checkout-cart.service';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { UsersService } from 'src/app/core/users/users.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { ICheckoutProduct } from '../../models/checkout-cart.model';
import { CheckoutViewComponent } from '../checkout-view/checkout-view.component';

const Boxs = {
  'yellow': 'yellow' as 'yellow',
}

@Component({
  selector: 'app-checkout-view4-finish',
  templateUrl: './checkout-view4-finish.component.html',
  styleUrls: ['./checkout-view4-finish.component.less']
})
export class CheckoutView4FinishComponent extends CheckoutViewComponent {

  public title = { message: '!Gracias por tu compra!', box: Boxs.yellow};
  public breadcrumbs: { text: string; path: string; }[] =[
    {
      text:'Inicio',
      path: '/',
    },
    {
      text: 'Pedido Completado',
      path: '/checkout/finish',
    }
  ];

  @ViewChild('checkoutView') checkoutView!: CheckoutViewComponent;

  public order: Order;
  public products: ICheckoutProduct[];

  constructor(
    public $router: Router, 
    public $toastr: ToastrService,
    public $orders: OrdersService,
    public $users: UsersService,
    public $breadcrumbs: BreadcrumbsService,
    public $cart: CheckoutCartService,
    private route: ActivatedRoute
  ) { 
    super($router, $toastr, $orders, $users, $breadcrumbs, $cart);
  }

  get products2(){
    return [...this.products, ...this.products];
  }
  async ngOnInit() {
    

    const orderId = this.route.snapshot.paramMap.get('orderId');
    console.log('orderId', orderId)

    // For Testing only
    const order = await this.$orders.getByOrderId(Number(orderId));
    const productsJson = JSON.parse(order.order_products_json) || [];
    const productsIds = productsJson.map((item:Product) => item.id);
    const products = await this.$orders.getProductsByIds(productsIds);
    this.order = order;
    this.products = products;

    setTimeout(() => {
       this.checkoutView.breadcrumbs = this.breadcrumbs;
      //this.$breadcrumbs.setBreadcrumbs([]);
      //this.$breadcrumbs.setBreadcrumb(null)
    }, 1000)
  }

  getProucts(products_json: string){
    if(!products_json){
      return []
    }
    return JSON.parse(products_json);
  }

  goToSeeMore(){
    this.$router.navigateByUrl('/profile')
  }

  goToHome(){
    this.$router.navigateByUrl('/')
  }
}
