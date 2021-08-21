import { HomePageComponent } from './home-page/home-page.component';
import { ProductPageComponent } from './product-page/product-page.component';

export const PagesRoutes = [
  //  Home Page Component
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'products/:id',
    component: ProductPageComponent,
  },
];
