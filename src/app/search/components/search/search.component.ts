import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { MoviesService } from '../../../core/services/movies.service';
import { Movies } from '../../../core/models/movieResponse';
import { LoginService } from '../../../core/services/login.service';

import { DetailComponent } from '../../../shared/components/detail/detail.component';

import { EmptyFavsComponent } from '../../components/empty-favs/empty-favs.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  search: FormGroup;

  movies: Partial<Movies>[] = [];
  pageSize: number | undefined;
  pageIndex: number | undefined;
  arrLength: number | undefined;
  actualSearch: string | undefined;
  loading = false;

  constructor(
    private authFB: AngularFireAuth,
    private movieService: MoviesService,
    private emptyFavs: MatDialog,
    private details: MatDialog,
    private fb: FormBuilder,
    private login: LoginService,
    private router: Router
  ) {
    this.search = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

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
    const data = sessionStorage.getItem('ngMov13User');
    if (!data || JSON.parse(data).movies < 1) {
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
