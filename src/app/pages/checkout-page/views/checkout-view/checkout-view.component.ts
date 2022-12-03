import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { CheckoutCartService } from 'src/app/core/cart/services/checkout-cart.service';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { UsersService } from 'src/app/core/users/users.service';
import { LayoutBasicComponent } from 'src/app/layouts/layout-basic/layout-basic.component';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import Breadcrumbs from '../../helpers/breadcrumbs';
import { ICheckoutCart } from '../../models/checkout-cart.model';

@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.less']
})
export class CheckoutViewComponent implements OnInit, OnDestroy {


  public cartSubs: Subscription;
  public checkoutCart$: Observable<ICheckoutCart>;
  
  //Cart
  cartPayload: ICheckoutCart;

  @ViewChild('layoutBasicComponet', { static: true }) layoutBasicComponet!: LayoutBasicComponent;

  @Input()
  title: { message: string; box?: 'yellow' | 'pink' | 'blue' | 'none'} = { message: ''};

  @Input()
  breadcrumbs:  { text: string; path: string;}[] = Breadcrumbs;

  constructor(
    public $router: Router, 
    public $toastr: ToastrService,
    public $orders: OrdersService,
    public $users: UsersService,
    public $breadcrumbs: BreadcrumbsService,
    public $checkoutCart: CheckoutCartService
    ) { 


    // CheckoutCart Store
    this.checkoutCart$ = this.$checkoutCart.checkoutCart$;

  }


  ngOnInit(): void {

    this.$breadcrumbs.setBreadcrumbs(Breadcrumbs);

    // Checkout Cart
    this.cartSubs = this.checkoutCart$.subscribe(cart => { 
      if(cart){
        this.cartPayload = JSON.parse(JSON.stringify(cart) + '');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.cartSubs) this.cartSubs.unsubscribe();
  }


  onContinue(){
    const isFinal = this.$breadcrumbs.nextBreadcrumb();
    if(isFinal) {
      this.onFinish()
    }
  }



  async onFinish(){

    console.log(' onFinish() ')

    // Get Cart
    const cart = JSON.parse(JSON.stringify(this.cartPayload) + '');

    // Get User
    const user = cart.user;

    // Get Shipping
    const shipping = {
      email: cart.shipping.data.email,
      fullName: cart.shipping.data.firstname + ' ' + cart.shipping.data.lastname,
      phoneNumber: cart.shipping.data.phone,
      phoneNumberPrefix: '+57',
      legalId: cart.user.nid_number || '',
      legalIdType: cart.user.nid_number || 'CC',
      addressLine1: cart.shipping.data.address,
      city: cart.shipping.data.city,
      department: cart.shipping.data.department,
      region: cart.shipping.data.country,
      country: "CO"
    }

    // Create Order Payload
    const payload:any = {
      'user_id': user.id,
      'user_nid_type' : user.nid_type,
      'user_nid_number': user.nid_number,
      'user_email': user.email,
      'user_name': user.name,
      'user_first_name': user.first_name,
      'user_last_name': user.last_name,
      'user_address': user.address ,
      'user_phone': shipping.phoneNumberPrefix + ' ' + shipping.phoneNumber,

      'order_points': cart.total/ 1000,
      'order_subtotal': cart.total - cart.taxes,
      'order_taxes': cart.taxes,
      'order_total':  cart.total,
      'order_products_json': JSON.stringify(cart.products.map((product: any) => ({
        id: product.id, qty: product.quantity, price: product.price, name: product.title
      }))),
 
      'shipping_status': 's0_pending',
      'shipping_phone':  shipping.phoneNumberPrefix + ' ' + shipping.phoneNumber,
      'shipping_address': shipping.addressLine1,
      'shipping_country': 'COLOMBIA',
      'shipping_department': shipping.department,
      'shipping_city': shipping.city,
    }

    // Create New Order
    const order = await this.$orders.create(payload)
    console.log(' order ', order)

    // Reference
    const reference = (new Date().toISOString().slice(0, 10)).replace(/-/g,'') + '_' + user.id + '_' + order.id;
    payload.order_ref = reference;


    console.log(' ')
    console.log(' Debugging::payload ')
    console.log(payload)
    console.log(' ')

  
    // Checkout object for Wompi
    var checkout = new (window as any).WidgetCheckout({
      currency: 'COP',
      amountInCents: cart.total*100,
      reference: reference,
      publicKey: 'pub_test_HSrvLLLfQUHV9mQ0Bas1zJLG7mdF8fmd',
      taxInCents: { 
        // Opcional
        vat: cart.taxes*100,
        consumption: 0
      },
      customerData: { 
        // Opcional
        email:shipping.email,
        fullName: shipping.fullName,
        phoneNumber: shipping.phoneNumber,
        phoneNumberPrefix: shipping.phoneNumberPrefix,
        legalId: shipping.legalId,
        legalIdType: shipping.legalIdType
      },
      shippingAddress: { 
        // Opcional
        addressLine1: shipping.addressLine1,
        city: shipping.city,
        phoneNumber: shipping.phoneNumber,
        region: shipping.region,
        country: shipping.country
      }
    });


    checkout.open((result:any) => {
      this.onWompiResponse(result, payload, order.id);
    });


  }



  async onWompiResponse(result: any, payload: any, orderId: number){

      console.log(' ')
      console.log(' onWompiResponse ')
      console.log(' ')
      console.log({result, payload, orderId})

      var transaction = result.transaction;
      var status = transaction.status;
      var isValid = (status === 'APPROVED');
      var _payload:any = {
        order_ref: payload.order_ref,
        shipping_status: 's1_ordered',
        ...transaction
      };

      // Pago de Wompi invalido
      if(!isValid){
        this.$toastr.error('Error procesando Pagos');
      }

      // Patch Order
      const order = await this.$orders.patch(orderId, _payload);
      this.$orders.setActiveOrderById(order.id);

      // Update User
      const email = payload.email;
      const user = await this.$users.getUserByEmail(email);
      this.$users.setUser(user);
      
      // Navigate to Thanks Page
      this.$router.navigateByUrl('/checkout/finish/order/'+order.id);
      
  }

  setBreadcrumb($event: any){

  }

}
