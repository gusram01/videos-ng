import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models/users';
import { Movies } from '../models/movieResponse';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
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

  saveMovie(idMovie: string) {
    const data = sessionStorage.getItem('ngMov13User');
    if (!data) {
      return;
    }
    const actualUser: Users = JSON.parse(data);
    const flag = actualUser.movies.findIndex(
      (item: string) => item === idMovie
    );
    if (flag < 0) {
      actualUser.movies.push(idMovie);
    } else {
      actualUser.movies.splice(flag, 1);
    }
    const users = this.getUsers();
    const actual = users.findIndex((item: Users) => item.id === actualUser.id);
    users.splice(actual, 1, actualUser);
    localStorage.setItem('MyNgMov13St0re', JSON.stringify(users));
    sessionStorage.setItem('ngMov13User', JSON.stringify(actualUser));
  }
}
