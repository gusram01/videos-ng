import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models/users';
// import { Movies } from '../models/movieResponse';
// import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  clean() {
    sessionStorage.removeItem('ngMov13User');
  }

  getUsers(): Users[] {
    const users = localStorage.getItem('MyNgMov13St0re');
    if (!users) {
      return [];
    } else {
      return JSON.parse(users);
    }
  }

  login(user: Partial<Users>) {
    const { username, password } = user;
    const id = `u${username}p${password}`;
    if (!username || !password) {
      return;
    }

    const users: Users[] = this.getUsers();
    const actual = users.find((item: Users) => item.id === id);

    if (!actual) {
      const newUser: Users = {
        username,
        password,
        id,
        movies: [],
      };
      users.push(newUser);
      localStorage.setItem('MyNgMov13St0re', JSON.stringify(users));
      sessionStorage.setItem('ngMov13User', JSON.stringify(newUser));
    } else {
      sessionStorage.setItem('ngMov13User', JSON.stringify(actual));
    }

    this.router.navigateByUrl('/search');
  }
}
