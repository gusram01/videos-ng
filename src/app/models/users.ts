import { Movies } from './movieResponse';
import { MovieDetailResponse } from './movieDetailsResponse';
export interface Users {
  id: string;
  username: string;
  password: string;
  movies: Partial<Movies>[];
}
