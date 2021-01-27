import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Movies } from '../../../core/models/movieResponse';
import { RealtimedbService } from '../../../core/services/realtimedb.service';
import { UserStore } from '../../../core/models/userStore';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css'],
})
export class FavComponent implements OnInit, OnDestroy {
  @Input() movie: Partial<Movies> | undefined;
  fav: boolean = false;
  userStored: UserStore | undefined;

  constructor(private db: RealtimedbService) {}

  ngOnInit() {
    this.db.onInitService();
    this.db.movies.subscribe((data) => {
      this.fav = data.findIndex((item) => item.id === this.movie!.id) >= 0;
    });
  }

  ngOnDestroy() {
    this.db.killSub$();
  }

  change() {
    const flag = this.db.updateMovies(this.movie as Partial<Movies>);
    this.fav = flag;
  }
}
