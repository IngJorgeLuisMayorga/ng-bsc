export type Coupon = {
    id: number;
    name: string;
    code: string;

    free_shipping: boolean,
    discount_percentage: number;
    discount_amount : number;
    enable: boolean;

    from_date: Date;
    to_date:Date;

    type: 'BY_PRODUCT' | 'BY_TOTAL_BIGGER' | 'BY_BRAND' | 'BY_FIRST_N' | 'BY_2_PRODUCTS_SAME_BRAND';

    variable_give_product_A_id: number;
    variable_give_product_B_id: number;
    variable_give_product_C_id: number;

    variable_give_discount_percentage: number;
    variable_give_discount_amount: number;
    variable_give_free_shipping: boolean;

    variable_by_brand_equal: string;
    variable_by_total_bigger_than: number;

    variable_by_first_N_orders_today_by_N: number;
    variable_by_first_N_orders_today_by_productId: number;

    variable_by_2_products_same_brand_brand: number;
    variable_by_2_products_same_brand_give_3rd_discount: number;

}

export const NULL_COUPON:Coupon = {
    id: -1,
    name: '',
    code: '',
    enable: false,
    free_shipping: false,
    from_date: new Date,
    to_date: new Date,
    type: 'BY_PRODUCT',
    discount_percentage: 0,
    discount_amount : 0,

    variable_give_product_A_id:  0,
    variable_give_product_B_id:  0,
    variable_give_product_C_id:  0,

    variable_give_discount_percentage: 0,
    variable_give_discount_amount: 0,
    variable_give_free_shipping: false,

    variable_by_brand_equal: '',
    variable_by_total_bigger_than: 0,

    variable_by_first_N_orders_today_by_N: 0,
    variable_by_first_N_orders_today_by_productId: 0,

    variable_by_2_products_same_brand_brand: 0,
    variable_by_2_products_same_brand_give_3rd_discount: 0
}



// Tipos de cupon
// 0 => ENVÍO GRATIS SIN MINIMO DE COMPRA
// 1 => ENVÍO GRATIS MAYOR A 300.OOO COP SIN INCLUIR EL ENVIO
// 2 => ENVÍO GRATIS MAYOR A 150.OOO COP SIN INCLUIR EL ENVIO
// 3 => 10%DE DESCUENTO POR MARCAS
// 4 => 10%DE DESCUENTO COMPRAS MAYORES A 150.000 COP SIN INCLUIR EL ENVIO
// 5 => 10%DE DESCUENTO COMPRAS MAYORES A 250.000 COP SIN INCLUIR EL ENVIO
// 6 => 10%DE DESCUENTO POR CUPON DADO (EJEMPLO UN CODIGO QUE DIGO EN HISTORIAS O UN LIVE ALGO MUY CERRADO, O UN INFLUENCIADOR)
// 7 => ENVÍO GRATIS POR CUPON DADO (EJEMPLO UN CODIGO QUE DIGO EN HISTORIAS O UN LIVE ALGO MUY CERRADO, O UN INFLUENCIADOR)
// 8 => PRODUCTO MINI GRATIS COMPRAS MAYORES A 150.000 COP SIN INCLUIR EL ENVIO 
// 9 => SHEET MASK GRATIS COMPRAS MAYORES A 100.000 COP SIN INCLUIR EL ENVIO
// 10 => 3 MINI MUESTRAS GRATIS COMPRAS MAYORES A 150.000 COP SIN INCLUIR EL ENVIO
// 11 => KIT GRATIS COMPRAS MAYORES A 250.000 COP SIN INCLUIR EL ENVIO
// 12 => PRODUCTO MINI GRATIS PRIMERAS 10 COMPRAS
// 13 => PRODUCTO MINI GRATIS PRIMERAS 20 COMPRAS

// 14 => 15% DE DESCUENTO POR MARCA
// 15 => 20% DE DESCUENTO EN EL SEGUNDO PRODUCTO DE MENOR VALOR SIN MINIMO DE COMPRA
// 16 => 20% DE DESCUENTO EN EL SEGUNDO PRODUCTO DE MENOR VALOR COMPRAS MAYORES A 150.000 SIN INCLUIR EL ENVIO
// 17 => LLEVA 3 PRODUCTOS  Y EL 3RO QUEDA CON 50% DE DESCUENTO SIN MINIMO DE COMPRA
// 18 => LLEVA 3 PRODUCTOS  Y EL 3RO QUEDA CON 50% DE DESCUENTO COMPRAS MAYORES A 150.000 SIN INCLUIR EL ENVI


// ADD NEW CUPON => 901
//      7 => [ variable_give_free_shipping, true]
//      18 => [ 'HALL97_BSC',  variable_by_total_bigger_than = 150000 ]
//      18 => [ 'NAV12_BSC' ,  variable_by_total_bigger_than = 230000, variable_give_free_shipping = true ]