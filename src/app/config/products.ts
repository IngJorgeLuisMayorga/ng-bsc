import { IProduct } from "../core/products/models/IProduct.model";

export default [
    {
        id: 1,
        sku: 222322,
        price:  184800,
        discount:  0.09,
        name: 'BUBBLE BOX PIEL SECA // BSC',
        image_src:  'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 2,
        category: 'PIEL_SECA',
        isInHome: true
    },
    {
        id: 2,
        sku: 222344,
        price:  284800,
        discount:  0.05,
        name: 'BUBBLE BOX PIEL GRASA // BSC',
        image_src:  'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 9,
        category: 'PIEL_GRASA',
        isInHome: true
    },
    {
        id: 3,
        sku: 222372,
        price:  184800,
        discount:  0.21,
        name: 'Freshly Juiced Vitamin Drop Serum Klairs',
        image_src: 'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 2,
        category: 'PIEL_MIXTA',
        isInHome: true
    },
    {
        id: 4,
        sku: 222372,
        price:  184800,
        discount:  0.21,
        name: 'BUBBLE BOX PIEL SECA 2',
        image_src:  'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 2,
        category: 'PIEL_MIXTA',
        isInHome: false
    },{
        id: 5,
        sku: 2224447,
        price:  0,
        discount:  0,
        name: 'DUO BUBBLE BOX 2 DUO BUBBLE BOX FINAL FINAL.ai',
        image_src: '',
        quantity: 12,
        category: 'DUO',
        isInHome: true,
        duo:{
            productA_id: 1,
            productB_id: 2,
            discount: 0.18,
        }
    },
    {
        id: 6,
        sku: 292322,
        price:  124800,
        discount:  0,
        name: 'BUBBLE BOX PIEL SECA BUBBLE BOX PIEL',
        image_src:  'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 2,
        category: 'PIEL_SECA',
        isInHome: false
    },
    {
        id: 7,
        sku: 182322,
        price:  184800,
        discount:  0,
        name: 'BUBBLE BOX PIEL SECA',
        image_src:  'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 2,
        category: 'PIEL_SECA',
        isInHome: false
    },
    {
        id: 8,
        sku: 282322,
        price:  184800,
        discount:  0.02,
        name: 'BUBBLE BOX PIEL SECA',
        image_src:  'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 2,
        category: 'PIEL_SECA',
        isInHome: false
    },
    {
        id: 9,
        sku: 1222332,
        price:  114300,
        discount:  0.59,
        name: 'BUBBLE BOX PIEL SECA',
        image_src: 'https://source.unsplash.com/1600x900/?beauty&v='+Math.random(),
        quantity: 2,
        category: 'PIEL_SECA',
        isInHome: false
    },
] as IProduct[] | any[];