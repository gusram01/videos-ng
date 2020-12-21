import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../models/movieResponse';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../../components/detail/detail.component';
import { FavsService } from '../../services/favs.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EmptyFavsComponent } from '../../components/empty-favs/empty-favs.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

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
  length: number | undefined;
  actualSearch: string | undefined;

  constructor(
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
    this.movieService.find(title).subscribe((data) => {
      this.actualSearch = title;
      this.movies = data.results;
      this.pageSize = data.results.length;
      this.pageIndex = data.page;
      this.length = data.total_results;
    });
  }

  changePage(event: PageEvent) {
    this.movieService
      .find(this.actualSearch!, event.pageIndex + 1)
      .subscribe((data) => {
        this.movies = data.results;
        this.pageIndex = data.page;
        this.length = data.total_results;
      });
  }

  openDialog(movie: Partial<Movies>) {
    const detailsRef = this.details.open(DetailComponent, { data: movie });
  }

  cleanScreen() {
    this.movies = [];
    // this.search.controls.title.setValue('');
    this.search.reset();
    this.search.markAsPristine();
    console.log(this.search);
  }

  onSubmit() {
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
    this.login.clean();
    this.router.navigateByUrl('/');
  }
}
