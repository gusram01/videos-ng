import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { RealtimedbService } from '../../../core/services/realtimedb.service';
import { MoviesService } from '../../../core/services/movies.service';
import { Movies } from '../../../core/models/movieResponse';

import { DetailComponent } from '../../../shared/components/detail/detail.component';

import { EmptyFavsComponent } from '../../components/empty-favs/empty-favs.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy {
  search: FormGroup;

  movies: Partial<Movies>[] = [];
  pageSize: number | undefined;
  pageIndex: number | undefined;
  arrLength: number | undefined;
  actualSearch: string | undefined;
  loading = false;

  private _storedMovies: Partial<Movies>[] | undefined;
  private _storedMoviesSub$: Subscription;

  constructor(
    private authFB: AngularFireAuth,
    private movieService: MoviesService,
    private emptyFavs: MatDialog,
    private details: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private db: RealtimedbService
  ) {
    this.search = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.db.onInitService();
    this._storedMoviesSub$ = this.db.movies.subscribe((data) => {
      this._storedMovies = data;
    });
  }

  ngOnDestroy() {
    this.db.killSub$();
    this._storedMoviesSub$.unsubscribe();
  }

  getMovies(title: string) {
    this.loading = true;
    this.movieService.find(title).subscribe((data) => {
      this.actualSearch = title;
      this.movies = data.results;
      this.pageSize = data.results.length;
      this.pageIndex = data.page;
      this.arrLength = data.total_results;
      this.loading = false;
    });
  }

  changePage(event: PageEvent) {
    this.loading = true;
    this.movieService
      .find(this.actualSearch!, event.pageIndex + 1)
      .subscribe((data) => {
        this.movies = data.results;
        this.pageIndex = data.page;
        this.arrLength = data.total_results;
        this.loading = false;
      });
  }

  openDialog(movie: Partial<Movies>) {
    const detailsRef = this.details.open(DetailComponent, { data: movie });
  }

  cleanScreen() {
    this.movies = [];
    this.search.reset();
    this.search.markAsPristine();
    this.pageSize = undefined;
    this.pageIndex = undefined;
    this.arrLength = undefined;
    this.actualSearch = undefined;
  }

  onSubmit() {
    if (this.loading) {
      return;
    }
    if (this.search.pristine || this.search.invalid) {
      return;
    }
    this.getMovies(this.search.value.title);
  }

  favs() {
    if (!this._storedMovies) {
      const dialog = this.emptyFavs.open(EmptyFavsComponent, {
        minWidth: '220px',
        minHeight: '300px',
      });
      return;
    }

    this.router.navigateByUrl('/favs');
  }

  logout() {
    this.authFB.signOut().then(() => {
      this.router.navigateByUrl('/');
    });
  }
}
