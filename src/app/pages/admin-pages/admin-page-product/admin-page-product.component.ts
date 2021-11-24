import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Product } from 'src/app/core/products/models/IProduct.model';
import { ProductsService } from 'src/app/core/products/products.service';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';
import { WishlistService } from 'src/app/core/wishlist/services/wishlist.service';
import { Wishlist } from 'src/app/core/wishlist/Wishlist.model';

@Component({
  selector: 'app-admin-page-product',
  templateUrl: './admin-page-product.component.html',
  styleUrls: ['./admin-page-product.component.less']
})
export class AdminPageProductComponent implements OnInit {

  public thumb = 0;
  private productId: number | null;

  public product: Product | null;
  public orders: Order[] | null;
  public wishlist: Wishlist[] | null;

  public nid_types:string[] = ['CC','TI','PA', 'CI']
  public nid_type:string = this.nid_types[0];

  constructor(
    private route: ActivatedRoute, 
    private $product: ProductsService,
    private $orders: OrdersService,
    private $wishlist: WishlistService,
    private sanitizer: DomSanitizer
    ) { }

  async ngOnInit() {

    this.productId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if(this.productId !== -1){
      this.product = await this.$product.getProduct(this.productId);
    }else {
      this.product = {
        id: 0,
        name: '',
        description: '',
        ingredients: '',
        image1_src: '',
        image2_src: '',
        image3_src: '',
        image4_src: '',
        sku: 0,
        price:0,
        discount: 0,
        quantity: 0,
    
        category_skin_id: 0,
        category_main_ingredient_id: 0,
        category_solution_id: 0,
        category_step_id: 0,
        category_brand_id: 0,
    
        category_skin: null,
        category_main_ingredient: null,
        category_solution: null,
        category_step: null,
        category_brand: null,
      }
    }

  }


  showPreview(event: any, thumb: number){

    if(event.target.files.length > 0){
      
      const product_thumb_index = (thumb as number + 1);
      const product_thumb_varname ='image'+product_thumb_index+'_src';

      const src = URL.createObjectURL(event.target.files[0]);
      const preview:HTMLImageElement = document.getElementById("file-ip-"+product_thumb_index+"-preview") as HTMLImageElement;
      //preview.src = src;
      //preview.style.display = "block";

      let objectURL = URL.createObjectURL(event.target.files[0]);       
      const image = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      console.log(' ')
      console.log(' ==> preview.src ')
      console.log(preview.src)
      console.log(' ')
      console.log('product_thumb_varname')
      console.log(product_thumb_varname)
      console.log(' ');
      console.log('image')
      console.log(image)
      console.log(' ');

      (this.product as any)[product_thumb_varname] = image;



    }
  }

}
