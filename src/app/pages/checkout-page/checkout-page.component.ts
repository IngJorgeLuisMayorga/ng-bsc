import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import products from 'src/app/config/products';
import { Coupon } from 'src/app/core/coupons/coupons.model';
import { CouponsService } from 'src/app/core/coupons/coupons.service';
import { IProduct, Product } from 'src/app/core/products/models/IProduct.model';
import { CartService } from 'src/app/core/cart/services/cart.service';
import { IFormField } from 'src/app/shared/components/forms/form-basic/form-basic.component';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { UsersService } from 'src/app/core/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/core/orders/orders.model';
import { ProductsService } from 'src/app/core/products/products.service';

const MAX_FREE_SHIPPING = 3 * 100000;

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.less']
})
export class CheckoutPageComponent implements OnInit {

  public step = 1;
  public products: any[] = [];
  public breadcrumb: { path: string; text: string } = { path: '', text: ''};
  public breadcrumbs: Array<{ path: string; text: string }> = [];
  
  public isOpen$: Observable<boolean>;
  public coupon$: Observable<Coupon>;
  public cartProducts$: Observable<Product[]>;
  public cartTotal$: Observable<number>;
  public cartProducts:any[] = [];
  public cartTotal = 0;
  public cartTotalWithCoupon = 0;
  public cartFreeShipping = 0;
  public couponTag:any;
  public enabledFinishBtn = true;
  
  public productA: Product | null = null;
  public productB: Product | null = null;
  public productC: Product | null = null;
  public productD: Product | null = null;

  public userFormFields: IFormField[] = [];
  public shippingFormFields: IFormField[] = [];
  public paymentFormFields: IFormField[] = [];

  public bubblePoints = 0;
  
  public order$: Observable<Order>;

  constructor(
    private router: Router, 
    private $user: UsersService, 
    private $products: ProductsService, 
    private $cart: CartService, 
    private toastr: ToastrService, 
    private $coupons: CouponsService, 
    private $orders: OrdersService) {
    this.breadcrumbs = [
      {
        text:'Inicio',
        path: '/',
      },
      {
        text:' Carrito',
        path: '/checkout/cart',
      },
      {
        text:' Datos',
        path: '/checkout/info',
      },
      {
        text:' Envio',
        path: '/checkout/shipping',
      },
      {
        text: 'Pago',
        path: '/checkout/payment',
      },
      {
        text: 'Pedido Completado',
        path: '/checkout/thanks',
      },
    ];
    this.coupon$ = this.$cart.coupon$;
    this.cartProducts$ = this.$cart.sync().pipe(
      map((_products:Product[]) => _products.filter((_product:Product) =>  _product && _product.quantity > 0 && _product.cart && _product.cart.quantity > 0))
    )
    this.cartTotal$ = this.$cart.syncCartTotal();
    this.cartTotal$.subscribe(total => {
      this.cartTotal = total;
      this.cartFreeShipping = 100 * total / MAX_FREE_SHIPPING;
    });
    this.cartProducts$.subscribe(products => {
      this.cartProducts = products
    })
    this.coupon$.subscribe( coupon => {
      this.cartTotalWithCoupon = this.$cart.applyCoupon(this.cartTotal);
    })
    
    this.order$ = this.$orders._activeOrder.asObservable();
  }

  ngOnInit(): void {

    //For Demo 
    this.$orders.setActiveOrderById(61);

    const cartCache = JSON.parse(localStorage.getItem('cart') || '[]');
    this.$cart.setCart(cartCache);

    //Restar Tabs Navigation
    const defaultBreadcrumb = this.breadcrumbs[1];
    if(!this.router.url.includes(defaultBreadcrumb.path)){
      this.router.navigateByUrl(defaultBreadcrumb.path);
    }

    this.cartProducts$.subscribe(cart => {
      if(cart) this.getRecommended(cart[0])
    })

  }


  async onFinish(){

    this.enabledFinishBtn = false;

    // Get User
    const user = await this.$user.getUserSnap();

    // Get Shipping Info
    const shipping = {
      email: this.shippingFormFields[2].value,
      fullName: this.shippingFormFields[0].value + this.shippingFormFields[1].value,
      phoneNumber: this.shippingFormFields[7].value,
      phoneNumberPrefix: '+57',
      legalId: user.nid_number || '',
      legalIdType: user.nid_type || 'CC',
      addressLine1: this.shippingFormFields[6].value,
      city: this.shippingFormFields[5].value,
      department: this.shippingFormFields[4].value,
      region: this.shippingFormFields[3].value,
      country: "CO"
    }

    const payload:any = {
      'user_id': user.id,
      'user_nid_type' : user.nid_type,
      'user_nid_number': user.nid_number,
      'user_email': user.email,
      'user_name': user.name,
      'user_first_name': user.first_name,
      'user_last_name': user.last_name,
      'user_address': user.address,
      'user_phone': shipping.phoneNumberPrefix + ' ' + shipping.phoneNumber,

      //'payment_id': null,
      //'payment_method': null,
      //'payment_approved_at': null,
      //'payment_wompi_id': null,

      //'coupon_id':null,
      //'coupon_discount':null,
      
      //'order_ref': null,
      'order_points': this.cartTotal / 1000,
      'order_subtotal': this.cartTotal*(1 - 0.19),
      'order_taxes': this.cartTotal*(0.19),
      'order_total':  this.cartTotal,
      'order_products_json': JSON.stringify(this.cartProducts.map((product:Product) => ({
        id: product.id, qty: product.cart.quantity, price: product.price, name: product.name
      }))),
 
      'shipping_status': 's0_pending',
      //'shipping_guide_ref': null,
      //'shipping_guide_company': null,
      'shipping_phone':  shipping.phoneNumberPrefix + ' ' + shipping.phoneNumber,
      'shipping_address': shipping.addressLine1,
      'shipping_country': 'COLOMBIA',
      'shipping_department': shipping.department,
      'shipping_city': shipping.city,
      //'shipping_ordered_at': null,
      //'shipping_shipped_at': null,
      //'shipping_delivered_at': null,


    }

    // Create New Order
    const order = await this.$orders.create(payload)

    // Reference
    const reference = (new Date().toISOString().slice(0, 10)).replace(/-/g,'') + '_' + user.id + '_' + order.id;
    payload.order_ref = reference;

    // Checkout object for Wompi
    var checkout = new (window as any).WidgetCheckout({
      currency: 'COP',
      amountInCents: this.cartTotal*100,
      reference: reference,
      publicKey: 'pub_test_HSrvLLLfQUHV9mQ0Bas1zJLG7mdF8fmd',
      taxInCents: { 
        // Opcional
        vat: this.cartTotal*100*(0.19),
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
    })

    checkout.open((result:any) => {

      var transaction = result.transaction;
      var status = transaction.status;
      var isValid = (status === 'APPROVED');

      var _payload:any = {
        order_ref: payload.order_ref,
        shipping_status: 's1_ordered',
        ...transaction
      };
      
      if(isValid){
        this.$orders.patch(order.id, _payload).then(response => {
            this.enabledFinishBtn = true;
            this.$orders.setActiveOrderById(response.id);
            this.router.navigateByUrl(this.breadcrumbs[5].path);
            const email = shipping.email;
            this.$user.getUserByEmail(email)
            .then(user =>{
              this.bubblePoints = 0.0 + Number(user.points);
              console.error(' ');
              console.error(' this.bubblePoints ');
              console.error(this.bubblePoints);
              console.error(' ');
            })
          }
        ).catch( error => {
          this.toastr.error('Error procesando Pagos');
          console.error('FALLO GUARDAR ORDER', error)
        })
      }
    })   
  } 

  setBreadcrumb(breadcumb: { path: string; text: string }){
    this.breadcrumb = breadcumb;
  }

  setStep(step: number){
    this.step = step;
  }

  async setCoupon(){
    const coupones = await this.$coupons.getCoupons();
    const coupon = coupones.find(_coupon => _coupon.code.toUpperCase() === (this.couponTag as string + '').toUpperCase())
    this.$cart.setCoupon(coupon);
  }

  onContinue(){
    const currentPath =  this.breadcrumb.path;
    const nextPathIndex = Math.min( this.breadcrumbs.length,  1 + this.breadcrumbs.findIndex((breadcrumb => breadcrumb.path === currentPath)) );
    const nextPath = this.breadcrumbs[nextPathIndex];
    this.router.navigateByUrl(nextPath.path);
  }

  setUserForm(userForm: IFormField[]){
    this.userFormFields = userForm;
  }

  setShippingForm(shippingForm: IFormField[]){
    this.shippingFormFields = shippingForm;
  }

  setPaymentForm(paymentForm: IFormField[]){
    this.paymentFormFields = paymentForm;
  }


async getRecommended(productCart?: Product){
    const product = productCart || this.$orders._activeOrder.getValue().products[0];
    const _products: Product[] = await this.$products.getProductsRecommended(product);
    this.productA = _products[0];
    this.productB = _products[1];
    this.productC = _products[2];
    this.productD = _products[3];
    return true;
  }

}
