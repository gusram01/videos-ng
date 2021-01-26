import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Movies } from '../models/movieResponse';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

interface UserStore {
  username: string;
  items: Partial<Movies>[];
}

@Injectable({
  providedIn: 'root',
})
export class RealtimedbService {
  itemRef: AngularFireObject<UserStore>;
  item: Observable<any>;
  private user: any;

  constructor(
    private db: AngularFireDatabase,
    private authFB: AngularFireAuth
  ) {
    this.authFB.user
      .pipe(
        tap((data: any) => {
          this.user = {
            username: data.email,
          };
        }),
        map((user: any) => user.uid)
      )
      .subscribe((data) => {
        this.itemRef = this.db.object(`item/${data}`);
        this.item = this.itemRef.valueChanges();
      });
  }

  save(newItem: UserStore) {
    this.itemRef.set(newItem);
  }

  change() {
    console.log(this.item);
    this.itemRef.set({ username: this.user, items: [{ ...this.movie }] });
  }
}
