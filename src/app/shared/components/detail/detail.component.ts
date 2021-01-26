import { Component, OnInit, Inject } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoviesService } from '../../../core/services/movies.service';
// import { MovieDetailResponse } from '../../../core/models/movieDetailsResponse';
// import { zip } from 'rxjs';
// import { map } from 'rxjs/operators';
import { Movies } from '../../../core/models/movieResponse';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  faTimes = faTimes;
  loading = true;
  detailsMovie: Partial<Movies> | undefined;
  cast: string[] | undefined;

  constructor(
    public detailRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: Partial<Movies>,
    private moviesService: MoviesService
  ) {
    this.detailsMovie = movie;
    this.moviesService
      .findCastById(this.movie.id!.toString())
      .subscribe((cast) => {
        this.cast = cast;
        this.loading = false;
      });
  }

  ngOnInit(): void {}

  close() {
    this.detailRef.close();
  }
}
