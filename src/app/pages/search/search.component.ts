import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../models/movieResponse';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  movies: Movies[] = [];
  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {}

  getMovies(event: string) {
    this.movieService.find(event).subscribe((data) => {
      this.movies = data;
    });
  }
}
