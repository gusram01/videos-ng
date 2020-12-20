import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.css'],
})
export class FavComponent implements OnInit {
  @Input() id: string | undefined;
  movies: string[];
  fav = false;

  constructor(private storeService: StoreService) {
    this.movies = this.storeMovies();
  }

  ngOnInit(): void {
    this.fav = this.movies.includes(this.id!);
  }

  storeMovies(): string[] {
    const data = sessionStorage.getItem('ngMov13User');
    if (!data) {
      return [];
    }
    const user: Users = JSON.parse(data);
    return user.movies;
  }

  change() {
    this.storeService.saveMovie(this.id!.toString());
    this.movies = this.storeMovies();
    this.fav = this.movies.includes(this.id!);
  }
}
