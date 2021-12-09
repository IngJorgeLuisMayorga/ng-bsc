import { Product } from "../products/models/IProduct.model";
import { User } from "../users/user.model";

export type Wishlist = {
    id: number;
    user: User;
    product: Product;
    add_at: Date;
}