export interface TheMovieDBResponse {
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
}

export interface Movies {
  adult: boolean;
  // backdrop_path: null | string;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum OriginalLanguage {
  En = 'en',
  Es = 'es',
}
