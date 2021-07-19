export interface IProduct {
    
    id: number;
    sku: string;
    price:  number;
    discount:  number;
    name: string;
    description? : string;
    image_src: string;
    quantity: number;
    category: string;

    isInHome?: boolean;

    cart?: {
        quantity: number;
        updated_at: Date;
    }
    
    duo?: {
        productA_id:number;
        productB_id:number;
        price: number;
        discount: number;
    };
}