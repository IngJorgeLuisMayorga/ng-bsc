import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../../products/models/IProduct.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private $http: HttpClient) { }

  async getCategories(){
    const categories = await this.$http.get<Category[]>(`${environment.server}/categories`).toPromise();
    categories.map((category: Category) => {
      category.picture_normal = (category.picture_normal.includes('http')) ? category.picture_normal : `${environment.server}` + category.picture_normal;
      category.picture_hover = (category.picture_hover.includes('http')) ? category.picture_hover : `${environment.server}` + category.picture_hover;
      category.image1_src = category.picture_normal;
      category.image2_src = category.picture_hover;
      return category;
    });
    return categories;
  }
  async getCategoriesById(id:string){
    const category = await this.$http.get<Category>(`${environment.server}/categories/${id}`).toPromise();
    category.picture_normal = (category.picture_normal.includes('http')) ? category.picture_normal : `${environment.server}` + category.picture_normal;
    category.picture_hover = (category.picture_hover.includes('http')) ? category.picture_hover : `${environment.server}` + category.picture_hover;
    category.image1_src = category.picture_normal;
    category.image2_src = category.picture_hover;
    return category;
  }
  async saveCategory(id: number, category:Category){
    const myFormData = new FormData();
    myFormData.append('picture_normal', (category as any).image1_src_blob);
    myFormData.append('picture_hover', (category as any).image2_src_blob);
    myFormData.append('category', category.id + '');
    
    let pictures = {
      'picture_normal': '',
      'picture_hover': '',
    }
    if((category as any).image1_src_blob || (category as any).image2_src_blob ){
      const _pictures = await this.$http.post<any>(`${environment.server}/categories/upload/picture`, myFormData).toPromise();
      pictures = _pictures;
      if(pictures.picture_normal) category.picture_normal = `${environment.server}/images/${pictures.picture_normal}`;
      if(pictures.picture_hover) category.picture_hover = `${environment.server}/images/${pictures.picture_hover}`;
    }

    console.error(' ')
    console.error(' ====> ')
    console.error(category)
    console.error(' ')
    console.error(' ')

    const _product = await this.$http.patch<Category>(`${environment.server}/categories/${id}`, category).toPromise();
    return _product;
  }
}
