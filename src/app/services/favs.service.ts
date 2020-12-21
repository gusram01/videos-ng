import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Movies } from '../models/movieResponse';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavsService {
  private _fav: boolean | undefined;
  private _fav$: Subject<boolean> = new Subject();
  get fav$() {
    return this._fav$.asObservable();
  }

  constructor() {}

  killFav$() {
    this._fav$.complete();
    console.log('killed');
  }

  initializesFav(id: number) {
    const data = sessionStorage.getItem('ngMov13User');
    if (!data) {
      this._fav = false;
      return;
    }
    const user: Users = JSON.parse(data);
    this._fav = user.movies.findIndex((movie) => movie.id === id) >= 0;
    this._fav$.next(this._fav);
  }

  changeFav(movie: Partial<Movies>) {
    const data = sessionStorage.getItem('ngMov13User');
    if (!data) {
      return;
    }

    const actualUser: Users = JSON.parse(data);
    const flag = actualUser.movies.findIndex(
      (item: Partial<Movies>) => item.id! === movie.id
    );

    if (flag < 0) {
      actualUser.movies.push(movie);
      this._fav = true;
      this._fav$.next(this._fav);
    } else {
      this._fav = false;
      actualUser.movies.splice(flag, 1);
      this._fav$.next(this._fav);
    }

    const users = JSON.parse(localStorage.getItem('MyNgMov13St0re') as string);
    const index = users.findIndex((item: Users) => item.id === actualUser.id);

    users.splice(index, 1, actualUser);
    localStorage.setItem('MyNgMov13St0re', JSON.stringify(users));
    sessionStorage.setItem('ngMov13User', JSON.stringify(actualUser));
  }
}
