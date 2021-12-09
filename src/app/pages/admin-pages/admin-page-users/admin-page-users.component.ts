import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/users/user.model';
import { UsersService } from 'src/app/core/users/users.service';


@Component({
  selector: 'app-admin-page-users',
  templateUrl: './admin-page-users.component.html',
  styleUrls: ['./admin-page-users.component.less']
})
export class AdminPageUsersComponent implements OnInit {


  users: User[];
  loading: boolean = true;

  constructor(private $users: UsersService, private router: Router) { }

  async ngOnInit() {
    this.users = await this.$users.getUsers();
    this.loading = false;
  }

  
  first = 0;

  rows = 10;

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.users ? this.first === (this.users.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.users ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  getTargetValue($event: any){
    return $event.target.value;
  }

  doOpenEdit(userId: number){
    this.router.navigateByUrl('/admin/users/'+userId)
  }

  doOpenAdd(){
    this.router.navigateByUrl('/admin/users/-1')
  }

}
