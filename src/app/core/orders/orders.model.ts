import { Coupon } from "../coupons/coupons.model";
import { Product } from "../products/models/IProduct.model";
import { User } from "../users/user.model";

export type Order = {

    id: number; //Identificador de Orden de compra
    user: User; //Informacion de usuario (si esta registrado)

    phone: string; // Telefono (si no esta registrado)
    city: string; // Ciudad (si no esta registrado)
    address: string; // Direaccion (si no esta registrado)
    subtotal:  number; // Subtotal (total - tax)
    tax: number; // Taxes 
    total: number; // Total a pagar
    discounts: number; //Total en descuentso (cupones y descuentos de productos)
    points: number; // Puntos acumulados

    ordered_at: Date; //Fecha de orden y pago
    shipped_at: Date; //Fecha de envio
    delivered_at: Date; //Fecha de entrega

    products: Product[]; //Lista de productos 
    coupons: Coupon[]; //Lista de coupones 

    payment_type: string; // Metodo de pago
    payment_reference: string; // Referencia del metodo de pago

}