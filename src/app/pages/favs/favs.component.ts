import { Component, OnInit } from '@angular/core';
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
export class FavsComponent implements OnInit {
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

  ngOnInit(): void {}

  back() {
    this.location.back();
  }
  logout() {
    this.login.clean();
    this.router.navigateByUrl('/');
  }
}
