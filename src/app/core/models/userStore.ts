import { Movies } from './movieResponse';

export interface UserStore {
  key?: string;
  username: string;
  items: Partial<Movies>[];
}
