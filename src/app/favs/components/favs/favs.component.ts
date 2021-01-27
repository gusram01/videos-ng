import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { RealtimedbService } from '../../../core/services/realtimedb.service';
import { MoviesService } from '../../../core/services/movies.service';
import { Movies } from '../../../core/models/movieResponse';
import { Cast } from '../../../core/models/movieCreditsResponse';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css'],
})
export class FavsComponent implements OnDestroy {
  movies: Partial<Movies>[] | undefined;
  cast: Cast[] = [];

  private _storedMoviesSub$: Subscription;

  constructor(
    private authFB: AngularFireAuth,
    private location: Location,
    private router: Router,
    private db: RealtimedbService
  ) {
    this.db.onInitService();
    this._storedMoviesSub$ = this.db.movies.subscribe((data) => {
      this.movies = data;
    });
  }

  ngOnDestroy() {
    this.db.killSub$();
    this._storedMoviesSub$.unsubscribe();
  }

  back() {
    this.location.back();
  }

  logout() {
    this.db.killSub$();
    this._storedMoviesSub$.unsubscribe();
    this.authFB
      .signOut()
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteFav(movie: Partial<Movies>) {
    this.db.updateMovies(movie);
  }
}
