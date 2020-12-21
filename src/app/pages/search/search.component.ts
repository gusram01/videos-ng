import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../models/movieResponse';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../../components/detail/detail.component';
import { FavsService } from '../../services/favs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  movies: Partial<Movies>[] = [];
  pageSize: number | undefined;
  pageIndex: number | undefined;
  length: number | undefined;
  actualSearch: string | undefined;

  constructor(
    private movieService: MoviesService,
    private details: MatDialog,
    private favsService: FavsService
  ) {}

  ngOnInit(): void {}

  getMovies(title: string) {
    this.movieService.find(title).subscribe((data) => {
      this.actualSearch = title;
      this.movies = data.results;
      this.pageSize = data.results.length;
      this.pageIndex = data.page;
      this.length = data.total_results;
    });
  }

  changePage(event: PageEvent) {
    this.movieService
      .find(this.actualSearch!, event.pageIndex + 1)
      .subscribe((data) => {
        this.movies = data.results;
        this.pageIndex = data.page;
        this.length = data.total_results;
      });
  }

  openDialog(movie: Partial<Movies>) {
    const detailsRef = this.details.open(DetailComponent, { data: movie });
  }
}
