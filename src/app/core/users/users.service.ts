import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public _user: BehaviorSubject<User> = new BehaviorSubject(null);
  public user$: Observable<User> = this._user.asObservable();

  constructor(private $http: HttpClient, private toastr: ToastrService) {

  }

  async auth(): Promise<User> {
    const id = 1; //15,9,6
    const user = await this.$http.get<User>(`${environment.server}/users/${id}`).toPromise();
    user.nid = user.nid_type + user.nid_number;
    this._user.next(user);
    return user;
  }

  async login(email: string, password: string): Promise<User> {
      try {
        console.warn(' ')
        console.warn(' login ')
        console.warn({ email, password })
        console.warn(' ')
        console.warn(' ')
        const userResponse = await this.$http.post<User>(`${environment.server}/users/auth/signin`, {
          email: email,
          password: password
        }).toPromise();
        userResponse.nid = userResponse.nid_type + userResponse.nid_number;
        this._user.next(userResponse);
        this.toastr.success('Usuario Loggeado Exitosamente');
        localStorage.setItem('user', JSON.stringify(userResponse));
        return userResponse;
      } catch (error) {
        this.toastr.error('Error ingresando, credenciales invalidas');
        throw error;
      }
  }

  async signup(user: User): Promise<User> {
    try {
      const userResponse = await this.$http.post<User>(`${environment.server}/users/auth/signup`, {
        ...user
      }).toPromise();
      userResponse.nid = userResponse.nid_type + userResponse.nid_number;
      this._user.next(userResponse);
      this.toastr.success('Usuario Creado Exitosamente');
      localStorage.setItem('user', JSON.stringify(userResponse));
      return userResponse;
    } catch (error) {
      this.toastr.error('Error creando usuario');
      throw error;
    }
  }


  async logout(): Promise<User> {
    this._user.next(null);
    return null;
  }

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
