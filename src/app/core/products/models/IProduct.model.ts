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

    visible?: boolean;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    ingredients: string;
    image1_src: string;
    image2_src: string;
    image3_src: string;
    image4_src: string;
    sku: number;
    price: number;
    discount: number;
    quantity: number;
    brand?: string;

    isDuo?: boolean;
    type?: string;
    productA_id?:number;
    productB_id?:number;

    category_skin_id: number;
    category_main_ingredient_id: number;
    category_solution_id: number;
    category_step_id: number;
    category_brand_id: number;
    category_extra_id: number;

    category_skin: Category;
    category_main_ingredient: Category;
    category_solution: Category;
    category_step: Category;
    category_brand: Category;
    category_extra: Category;

    cart?: {
        quantity: number;
        updated_at: Date;
    }

    categories?: {
        skin: { src: string;  src_hv: string; title: string },
        main_ingredient: { src: string; src_hv: string; title: string },
        solution: { src: string; src_hv: string; title: string },
        step: { src: string; src_hv: string; title: string },
        brand: { src: string; src_hv: string; title: string },
    }

    duo?: {
        productA_id:number;
        productB_id:number;
        price: number;
        discount: number;
    };

    visible?: number;


}


export type Category = {
    id: number;
    name: string;
    type: 'SKIN' | 'MAIN_INGREDIENT' | 'SOLUTION' | 'STEP' | 'BRAND' | 'EXTRA';
    picture_normal: string;
    picture_hover: string;
    image1_src?: string;
    image2_src?: string;
}
