import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backdrop',
})
export class BackdropPipe implements PipeTransform {
  transform(backdrop: string | null | undefined, ...args: unknown[]): string {
    return !backdrop
      ? '/assets/no-image.jpg'
      : `url(https://image.tmdb.org/t/p/w500/${backdrop})`;
  }
}
