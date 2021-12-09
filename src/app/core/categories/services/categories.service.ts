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
    return categories;
  }
}
