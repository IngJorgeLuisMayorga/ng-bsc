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
    ingredients?: string;
    categories?: {
        skin: { src: string;  src_hv: string; title: string },
        main_ingredient: { src: string; src_hv: string; title: string },
        solution: { src: string; src_hv: string; title: string },
        step: { src: string; src_hv: string; title: string },
        brand: { src: string; src_hv: string; title: string },
    }

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