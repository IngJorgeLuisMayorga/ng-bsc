import { Coupon } from "../coupons/coupons.model";
import { Product } from "../products/models/IProduct.model";
import { User } from "../users/user.model";

export type Order = {

    id?: number;
    user_id?: number;
    user_nid_type?: string;
    user_nid_number?: string;
    user_email?: string;
    user_name?: string;
    user_first_name?: string;
    user_last_name?: string;

    payment_id?: number;
    payment_method?: string;
    payment_approved_at?: Date;
    payment_wompi_id?: string;

    coupon_id?: number;
    coupon_discount?: number;
    
    order_ref?: string;
    order_points?: number;
    order_subtotal?: number;
    order_taxes?: number;
    order_total?: number;
    order_products_json?: any;

    shipping_status?: string;
    shipping_guide_ref?: string;
    shipping_guide_company?: string;
    shipping_phone?: string;
    shipping_address?: string;
    shipping_country?: string;
    shipping_department?: string;
    shipping_city?: string;
    
    shipping_ordered_at?: Date;
    shipping_shipped_at?: Date;
    shipping_delivered_at?: Date;

    state: "ORDERED" | "SHIPPED" | "DELIVERED" | "CANCELED" | "RETURNED";
    
    products?: Product[]; //Lista de productos 
    coupons?: Coupon[]; //Lista de coupones 

    updated_at: Date;

}