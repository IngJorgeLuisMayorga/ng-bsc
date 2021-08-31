export default interface {

    title: string,

    photo_1: string,
    photo_2: string,
    photo_3: string,
    photo_4: string,

    price: number,
    points: number,
    discount: number,
    
    catalog: string, // COP, POINTS

    stock: number,

    size: string;
    description: string;

    ingredients: string; // html con negrilla

    instructions_title: string;
    instructions_text: string;

    category_skin_type: string; => id, texto, src , src_hover
    category_main_ingredient: string;  => id, texto, src , src_hover
    category_solution: string;  => id, texto, src , src_hover
    category_step: string;  => id, texto, src , src_hover
    category_brand: string;  => id, texto, src , src_hover

}

Categrory {   
    type:  string;
    text: string;
    icon: string;
    banner: string;
    description: string;
}


//Productos recomendados  aleatorio
// 1.) No mostrar de mismo step
// 3.) Mostrar del mismo main ingredient
// 4.) Mostrar del mismo solucion
// 5.) Mostrar de la misma marca
// 6.) No salga repetido el mismo producto
/**
 * 1. Mostrar del mismo tipo de piel & Mostrar del mismo solucion
 * 2. Mostrar del mismo tipo de piel & Mostrar de la misma marca
 * 3. Mostrar del mismo tipo de piel & Mostrar del mismo main ingredient
 */

// Order
{
    id: number,
    type: string, //reserva o stock
}
