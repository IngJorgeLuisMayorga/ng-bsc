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
        price:   110000,
        discount:  0.10,
        name: 'Freshly Juiced Vitamin Drop Serum Klairs',
        image_src: 'https://firebasestorage.googleapis.com/v0/b/kyte-7c484.appspot.com/o/0ZR90or5lPZyYKb01UsROxqwIFx1%2FC8E9B153-A714-4559-A8AA-1B49BDD26C0C.jpg?alt=media',
        quantity: 2,
        category: 'PIEL_MIXTA',
        isInHome: true,

        description: "  Serum antioxidante, diseñado con ingredientes naturalmente efectivos que son seguros y no irritantes. Además, energizay rejuvenece la piel con el poder de la Vitamina C pura al5%, lo suficientemente suave y eficaz para todos los tiposde piel, incluidas las más sensibles",
        ingredients: "Water, Propylen Glycol, Ascorbic Acid, Hydroxyethylcellulose, Centella Asiatica Extract, Citrus Junos Fruit Extract, Illicium Verum(Anise) Fruit Extract, Citrus Paradisi(Grapefruit) Fruit Extract, Nelumbium Speciosum Flower Extract, Paeonia Suffruticosa Root Extract, Scutellaria Baicalensis Root Extract, Polysorbate 60, Brassica Oleracea Italica (Broccoli) Extract, Chaenomeles Sinensis Fruit Extract, Citrus Aurantium Dulcis (Orange) Oil, Sodium Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Disodium EDTA, Lavandula Angustifolia (Lavender) Oil, Camellia Sinensis Callus Culture Extract, Larix Europaea Wood Extract, Chrysanthellum Indicum Extract, Rheum Palmatum Root Extract, Asarum Sieboldi Root Extract, Quercus Mongolia Leaf Extract, Persicaria Hydropiper Extract, Corydalis Turtschaninovii Root Extract, Coptis Chinensis Root Extract, Magnolia Obovata Bark Extract, Lysine HCL, Proline, Sodium Ascorbyl Phosphate, Acetyl Methionine, Theanine, Lecithin, Acetyl Glutamine, SH-Olgopeptide-1, SH-Olgopeptide-2, SH-Polypeptide-1, SH Polypeptide-9, SH-Polypeptide-11, Bacillus/Folic Acid Soybean Ferment Extract, Sodium Hyaluronate, Caprylyl Glycol, Butylene Glycol, 1,2-Hexanediol, Limonen."
        ,
        categories: {
            skin: { 
                index: 0,
                src: "../../../assets/categorias/piel sensible 1.png",  
                src_hv: "../../../assets/categorias/piel sensible 2.png",  
                title: "Apto para piel sensible" 
            },
            main_ingredient: { 
                index: 1,
                src: "../../../assets/categorias/vitaminac 1.png",  
                src_hv: "../../../assets/categorias/vitaminac 2.png", 
                title: "Ácido Ascórbico" 
            },
            solution: { 
                index: 2,
                src: "../../../assets/categorias/antioxidante 1.png",  
                src_hv: "../../../assets/categorias/antioxidante 2.png",  
                title: "Producto Antioxidante" 
            },
            step: { 
                index: 3,
                src: "../../../assets/categorias/serum 1.png",  
                src_hv: "../../../assets/categorias/serum 2.png", 
                title: "Paso 7 Serum" 
             },
            brand: {
                index: 4, 
                src: "../../../assets/categorias/klairs 1.png",  
                src_hv: "../../../assets/categorias/klairs 2.png",  
                title: "Klairs" 
            },
        }
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