import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private router: Router) {}

  clean() {
    sessionStorage.removeItem('ngMov13User');
  }

  getUsers() {
    const users = localStorage.getItem('MyNgMov13St0re');
    if (!users) {
      return [];
    } else {
      return JSON.parse(users);
    }
  }

  login(user: Users) {
    const users: Users[] = this.getUsers();
    const actual = users.find((item: Users) => item.username === user.username);
    if (!actual) {
      users.push(user);
      localStorage.setItem('MyNgMov13St0re', JSON.stringify(users));
      sessionStorage.setItem('ngMov13User', JSON.stringify(user));
    } else {
      sessionStorage.setItem('ngMov13User', JSON.stringify(user));
    }
    this.router.navigateByUrl('/search');
  }
}
