import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TheMovieDBResponse, Movies } from '../models/movieResponse';
import { MovieDetailResponse } from '../models/movieDetailsResponse';
import { MovieCreditsResponse, Cast } from '../models/movieCreditsResponse';

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
    };
  }

  constructor(private http: HttpClient) {}

  find(query: string): Observable<Movies[]> {
    return this.http
      .get<TheMovieDBResponse>(`${this.url}/search/movie`, {
        params: {
          ...this.params,
          include_adult: 'false',
          page: this.pageParams.toString(),
          query: query,
        },
      })
      .pipe(map((resp) => resp.results));
  }

  findById(id: string): Observable<MovieDetailResponse> {
    return this.http.get<MovieDetailResponse>(`${this.url}/movie/${id}`, {
      params: {
        ...this.params,
      },
    });
  }

  findCastById(id: string): Observable<string[]> {
    return this.http
      .get<MovieCreditsResponse>(`${this.url}/movie/${id}/credits`, {
        params: {
          ...this.params,
        },
      })
      .pipe(map((data) => data.cast.map((item) => item.name)));
  }
}
