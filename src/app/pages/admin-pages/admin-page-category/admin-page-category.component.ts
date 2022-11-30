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


type CategoryTypes =  'SKIN' | 'MAIN_INGREDIENT' | 'SOLUTION' | 'STEP' | 'BRAND' | 'EXTRA';

@Component({
  selector: 'app-admin-page-category',
  templateUrl: './admin-page-category.component.html',
  styleUrls: ['./admin-page-category.component.less']
})
export class AdminPageCategoryComponent implements OnInit {
  public thumb = 0;
  private categoryId: number | null;
  public category: Category | null;
  public types:CategoryTypes[] = ['SKIN', 'MAIN_INGREDIENT', 'SOLUTION', 'STEP', 'EXTRA'];
  public type:CategoryTypes = this.types[0];
  constructor(
    private route: ActivatedRoute, 
    private $categories: CategoriesService,
    private sanitizer: DomSanitizer
    ) { }

  async ngOnInit() {
    this.categoryId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if(this.categoryId !== -1){
      this.category = await this.$categories.getCategoriesById(this.categoryId + '');
    }else {
      this.category = {
        id: 0,
        name: '',
        type: 'STEP',
        picture_hover:'',
        picture_normal: ''
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

      (this.category as any)[product_thumb_varname] = image;
      (this.category as any)[product_thumb_varname+'_blob'] = event.target.files[0];
      
    }
  }

  nChangeDuo($event: any){
 
  }

  save(){
    this.$categories.saveCategory(this.categoryId, {
      ...this.category,
      picture_normal: this.category.image1_src,
      picture_hover: this.category.image2_src,
      type: this.type,
    });

  }

}
