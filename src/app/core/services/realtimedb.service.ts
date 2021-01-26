import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Movies } from '../models/movieResponse';
import { UserStore } from '../models/userStore';

@Injectable({
  providedIn: 'root',
})
export class RealtimedbService {
  private itemRef: AngularFireList<UserStore> | undefined;
  private _item: UserStore | undefined;
  private actualKey: any;
  private email: string;

  get item$() {
    return this._item;
  }

  constructor(
    private db: AngularFireDatabase,
    private authFB: AngularFireAuth
  ) {
    this.authFB.user
      .pipe(
        tap((data: any) => {
          this.email = data.email;
        }),
        map((user: any) => user.uid),
        tap((uid) => {
          this.itemRef = this.db.list(`users/${uid}`);
        })
      )
      .subscribe((uid) => {
        this.itemRef!.snapshotChanges()
          .pipe(
            map((changes) =>
              changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
            )
          )
          .subscribe((data: any[]) => {
            if (data.length < 1) {
              this.newUser(data);
            }
            // this._item = data.filter((val) => val.username === this.email)[0];
          });
        console.log('first suscribed');
      });
  }

  finish() {}

  private newUser() {
    const addUser = {
      username: this.email,
      items: [] as Movies[],
    };
    this.itemRef!.push(addUser);
  }
  updateMovies(movie: Partial<Movies>) {
    const info = this.isMovieInStore(movie);
    if (!info) {
    }
    console.log(info);
  }
  updateActualMovies(movie: Partial<Movies>) {
    this.itemRef!.set();
  }
  // async save(newItem: UserStore) {
  //   if (!this.itemRef) {
  //     return false;
  //   }
  //   return await this.itemRef.set(newItem).catch((err) => {
  //     console.log(err);
  //   });
  // }

  private isMovieInStore(movie: Partial<Movies>) {
    const index = this._item!.items.findIndex((val) => val.id === movie.id);
    if (index < 0) {
      return [false, null];
    }
    return [true, index];
  }
}
