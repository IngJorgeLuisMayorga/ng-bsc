import { Product } from "src/app/core/products/models/IProduct.model";

export interface ICheckoutProduct {
    id: number;
    photo: string;
    title: string;
    description: string;
    brand: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
};

export interface ICheckoutUser {
  id: number;
  email: string;
  nid_number: string;
  nid_type: string;
  points: number;
  name: string;
  first_name: string;
  last_name: string;
  address: string;
}

export interface ICheckoutShippingData{
    address: string;
    city: string;
    country: string;
    department: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
}

export interface ICheckoutShipping {

  data: ICheckoutShippingData;
  coupon?: any;
  value: number;

  isFree:boolean;
  isPending:boolean;
  isFreeByCoupon:boolean;
  
  missingToFree: number; 

}

export interface ICheckoutCart{

    products: Array<ICheckoutProduct>;

    shipping: ICheckoutShipping;

    user?: ICheckoutUser;
        
    total: number;
    taxes: number;
    subtotal: number;

  }