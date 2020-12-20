import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TheMovieDBResponse, Movies } from '../models/movieResponse';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  url = `https://api.themoviedb.org/3`;
  private pageParams = 1;
  get params(): any {
    return {
      api_key: `${environment.api_key}`,
      language: 'en-US',
      include_adult: 'false',
      page: this.pageParams.toString(),
    };
  }

  constructor(private http: HttpClient) {}

  find(query: string): Observable<Movies[]> {
    return this.http
      .get<TheMovieDBResponse>(`${this.url}/search/movie`, {
        params: {
          ...this.params,
          query: query,
        },
      })
      .pipe(map((resp) => resp.results));
  }
}
