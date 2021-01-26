import { Movies } from './movieResponse';

export interface UserStore {
  idstore: string;
  username: string;
  items: Partial<Movies>[];
}
