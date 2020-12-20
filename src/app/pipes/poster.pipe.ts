import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster',
})
export class PosterPipe implements PipeTransform {
  transform(poster: string | null, ...args: unknown[]): string {
    const url = 'https://image.tmdb.org/t/p/w500';
    return !poster ? '/assets/no-image.jpg' : url + poster;
  }
}
