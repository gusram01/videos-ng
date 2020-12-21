import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movies } from '../../models/movieResponse';
import { FavsService } from '../../services/favs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css'],
})
export class FavComponent implements OnInit, OnDestroy {
  @Input() movie: Partial<Movies> | undefined;
  subs: Subscription;
  fav: boolean = false;

  constructor(private favsService: FavsService) {
    this.subs = this.favsService.fav$.subscribe((data) => {
      this.fav = data;
    });
  }
  ngOnInit() {
    this.favsService.initializesFav(this.movie!.id!);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('uns', this.movie!.id);
  }

  change() {
    this.favsService.changeFav(this.movie!);
  }
}
