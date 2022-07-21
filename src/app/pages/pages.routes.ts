import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const PagesRoutes = [
  //  Home Page Component
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'products/:id',
    component: ProductPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'checkout/:step',
    component: CheckoutPageComponent,
  },
];
