import { Component, OnInit } from '@angular/core';
import { Movies } from '../../models/movieResponse';
import { Cast } from '../../models/movieCreditsResponse';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css'],
})
export class FavsComponent implements OnInit {
  movies: Movies[] = [];
  cast: Cast[] = [];

  constructor() {}

  ngOnInit(): void {}
}
