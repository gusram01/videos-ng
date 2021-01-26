import { Component, Input, OnInit } from '@angular/core';

import { Movies } from '../../../core/models/movieResponse';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css'],
})
export class FavComponent implements OnInit {
  @Input() movie: Partial<Movies> | undefined;
  fav: boolean = false;

  constructor() {}

  ngOnInit() {
    // this.favsService.initializesFav(this.movie!.id!);
  }

  change() {}
}
