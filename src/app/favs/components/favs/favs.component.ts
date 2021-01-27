import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Movies } from '../../../core/models/movieResponse';
import { Cast } from '../../../core/models/movieCreditsResponse';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css'],
})
export class FavsComponent {
  movies: Partial<Movies>[] | undefined;
  cast: Cast[] = [];

  constructor(
    private location: Location,
    private login: LoginService,
    private router: Router
  ) {}

  back() {
    this.location.back();
  }
  logout() {
    this.login.clean();
    this.router.navigateByUrl('/');
  }
  deleteFav(movie: Partial<Movies>) {}
}
