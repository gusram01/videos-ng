import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subscription, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Movies } from '../models/movieResponse';
import { UserStore } from '../models/userStore';

@Injectable({
  providedIn: 'root',
})
export class RealtimedbService {
  private itemRef: AngularFireList<UserStore> | undefined;
  private _item: UserStore | undefined;
  private email: string | undefined;
  private _activeSubs: Subscription | undefined;
  private _movies$ = new Subject<Partial<Movies>[]>();

  constructor(
    private db: AngularFireDatabase,
    private authFB: AngularFireAuth
  ) {}

  get movies() {
    return this._movies$.asObservable();
  }

  onInitService() {
    // need initialize the service in every build of the component
    this._activeSubs = this.init()
      .pipe(map((data) => data[0].items))
      .subscribe(this._movies$);
  }

  killSub$() {
    // unsubscribed in onDestroy lifecycle
    this._activeSubs!.unsubscribe();
    console.log('db unsubscribed');
  }

  private init() {
    // Work first over auth user
    return this.authFB.user.pipe(
      // store the email user as username
      tap((data: any) => {
        this.email = data.email;
      }),
      // need uid for validate the credentials
      map((user: any) => {
        return user.uid;
      }),
      // connect the service with the db
      tap((uid) => {
        this.itemRef = this.db.list(`users/${uid}`);
      }),
      // convert the data to managable data (most of all, need key of object)
      switchMap(() =>
        this.itemRef!.snapshotChanges().pipe(
          map((changes) => {
            // if user does not exist is created
            if (changes.length < 1) {
              this.itemRef!.push({
                username: this.email as string,
                // need to store dummy data otherwise db service don't store this items
                items: [{ id: '1' }] as Array<Partial<Movies>>,
              });
            }
            //convert the data
            return changes.map((c) => ({
              key: c.payload.key,
              ...c.payload.val(),
            }));
          }),
          // store the usefull data
          tap((data: any) => {
            this._item = data[0];
          })
        )
      )
    );
  }

  updateMovies(movie: Partial<Movies>) {
    const [isStored, indexStore] = this.isMovieInStore(movie);
    // if the movie exist in the store is erased otherwise is added
    if (!isStored) {
      this.insertMovie(movie)
        .then(() => {
          console.log('ok add');
        })
        .catch((err) => {
          console.log('Please try again later');
        });
    } else {
      this.removeMovie(indexStore as number)
        .then(() => {
          console.log('ok del');
        })
        .catch((err) => {
          console.log('Please try again later');
        });
    }

    return !isStored;
  }

  private isMovieInStore(movie: Partial<Movies>) {
    // Validate if the user is created and contains movies
    if (!this._item || !this._item.items) {
      return [false, null];
    }
    // Validate if the sended movie is inside the store
    const index = this._item!.items.findIndex((val) => val.id === movie.id);

    // if movie does not inside the store return falsy response
    if (index < 0) {
      return [false, null];
    }

    // if the movie is inside the store return true and the index
    return [true, index];
  }

  private async insertMovie(movie: Partial<Movies>) {
    // insert movies into array movies if does not exist
    return await this.itemRef!.update(this._item!.key!, {
      ...this._item,
      // use spread operator to update items array
      items: [...this._item!.items, movie],
    }).catch((err) => err);
  }

  private async removeMovie(index: number) {
    // remove movies from array movies
    this._item!.items.splice(index, 1);
    return await this.itemRef!.update(this._item!.key!, {
      ...this._item,
      // use spread operator to update items array
      items: [...this._item!.items],
    }).catch((err) => err);
  }
}
