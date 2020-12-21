import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Movies } from '../../models/movieResponse';
import { Cast } from '../../models/movieCreditsResponse';
import { FavsService } from '../../services/favs.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css'],
})
export class FavsComponent {
  movies: Partial<Movies>[] | undefined;
  cast: Cast[] = [];

  constructor(
    private favsService: FavsService,
    private location: Location,
    private login: LoginService,
    private router: Router
  ) {
    this.movies = this.favsService.storedData();
  }

  back() {
    this.location.back();
  }
  logout() {
    this.login.clean();
    this.router.navigateByUrl('/');
  }
  deleteFav(movie: Partial<Movies>) {
    this.favsService.changeFav(movie);
    this.movies = this.favsService.storedData();
    if (this.movies && this.movies.length === 0) {
      this.location.back();
    }
  }
}
