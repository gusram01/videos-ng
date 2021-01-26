import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TheMovieDBResponse, Movies } from '../models/movieResponse';
import { MovieCreditsResponse, Cast } from '../models/movieCreditsResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  url = `https://api.themoviedb.org/3`;

  get params(): any {
    return {
      api_key: `${environment.api_key}`,
      language: 'en-US',
    };
  }

  constructor(private http: HttpClient) {}

  find(query: string, page = 1): Observable<TheMovieDBResponse> {
    return this.http.get<TheMovieDBResponse>(`${this.url}/search/movie`, {
      params: {
        ...this.params,
        include_adult: 'false',
        page,
        query: query,
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
