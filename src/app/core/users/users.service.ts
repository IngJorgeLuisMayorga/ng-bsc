import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private $http: HttpClient) { }

  async getUsers(): Promise<User[]> {
    const users = await this.$http.get<User[]>(`${environment.server}/users`).toPromise();
    users.map((user: User) => user.nid = user.nid_type + user.nid_number);
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.$http.get<User>(`${environment.server}/users/${id}`).toPromise();
    user.nid = user.nid_type + user.nid_number;
    return user;
  }
}
