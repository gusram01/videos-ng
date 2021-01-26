export interface TheMovieDBResponse {
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
}

export interface Movies {
  adult: boolean;
  backdrop_path: null | undefined | string;
  genre_ids: number[];
  id: string;
  original_language: string;
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
