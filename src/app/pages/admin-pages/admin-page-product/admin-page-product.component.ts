import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/core/categories/services/categories.service';
import { Order } from 'src/app/core/orders/orders.model';
import { OrdersService } from 'src/app/core/orders/orders.service';
import { Category, IProduct, Product } from 'src/app/core/products/models/IProduct.model';
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

  public productA: any = null;
  public productB: any = null;

  public products: Product[] = [];

  public checked = false;
  public productTypes = ['SHOP', 'POINTS', 'FREE'];
  public productType = this.productTypes[0];

  public categorySkin: any = null;
  public categoryMainIngredient: any = null;
  public categorySolution: any = null;
  public categoryStep: any = null;
  public categoryExtra: any = null;

  public categorySkins: any[] = [];
  public categoryMainIngredients: any[] = [];
  public categorySolutions: any[] = [];
  public categorySteps: any[] = [];
  public categoryExtras: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private $product: ProductsService,
    private $categories: CategoriesService,
    private $orders: OrdersService,
    private $wishlist: WishlistService,
    private sanitizer: DomSanitizer
    ) { }

  async ngOnInit() {

    this.productId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.products = await this.$product.getProducts();

    this.productA = this.products[0];
    this.productB = this.products[1];

    const categories = await this.$categories.getCategories();
    this.categorySkins = categories.filter((category: Category) => category.type === 'SKIN');
    this.categoryMainIngredients = categories.filter((category: Category) => category.type === 'MAIN_INGREDIENT');
    this.categorySolutions = categories.filter((category: Category) => category.type === 'SOLUTION');
    this.categorySteps = categories.filter((category: Category) => category.type === 'STEP');
    this.categoryExtras = categories.filter((category: Category) => category.type === 'EXTRA');

    if(this.productId !== -1){
      this.product = await this.$product.getProduct(this.productId);
      this.categorySkin = this.product.category_skin;
      this.categoryMainIngredient = this.product.category_main_ingredient;
      this.categorySolution = this.product.category_solution;
      this.categoryStep = this.product.category_step;
      this.categoryExtra = this.product.category_extra;
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
        category_extra_id: 0,
    
        category_skin: null,
        category_main_ingredient: null,
        category_solution: null,
        category_step: null,
        category_brand: null,
        category_extra: null
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

      (this.product as any)[product_thumb_varname] = image;
      (this.product as any)[product_thumb_varname+'_blob'] = event.target.files[0]; 
    }
  }

  nChangeDuo($event: any){
    if(this.checked){

    } else {

    }
  }

  save(){
    this.$product.saveProduct(this.productId, {
      ...this.product,
      type: this.productType,
      isDuo: this.checked,
      productA_id: this.productA.id,
      productB_id: this.productB.id,
    });
  }

}
