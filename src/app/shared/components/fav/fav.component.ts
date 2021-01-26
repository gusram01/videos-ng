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
    // this.favsService.initializesFav(this.movie!.id!);
    // console.log(this.db.item$);
  }

  ngOnDestroy() {
    // this.db.finish();
  }

  change() {
    console.log(this.db.updateMovies(this.movie as Partial<Movies>));
    // const data = this.db.isMovieInStore(this.movie as Partial<Movies>);
    // console.log(data);
    // console.log(this.userStored);
    // this.db.change(this.movie as Partial<Movies>).subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (err) => {
    //     console.log(err);
    //   },
    //   () => {
    //     console.log('unsuscribed');
    //   }
    // );
  }
}
