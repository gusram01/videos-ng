import { Component, OnInit, Inject } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoviesService } from '../../services/movies.service';
import { MovieDetailResponse } from '../../models/movieDetailsResponse';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  faTimes = faTimes;
  loading = true;
  movie: MovieDetailResponse | undefined;
  cast: string[] | undefined;

  constructor(
    public detailRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private moviesService: MoviesService
  ) {
    zip(
      this.moviesService.findById(this.data.id.toString()),
      this.moviesService.findCastById(this.data.id.toString())
    )
      .pipe(map(([details, cast]) => ({ details, cast })))
      .subscribe((data) => {
        this.movie = data.details;
        this.cast = data.cast;
        this.loading = false;
      });
  }

  ngOnInit(): void {}

  close() {
    this.detailRef.close();
  }
}
