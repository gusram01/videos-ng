import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movies } from '../../models/movieResponse';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() movie: Partial<Movies> | undefined;
  @Output() selectedMovie: EventEmitter<Partial<Movies>> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitId(movie: Partial<Movies>) {
    this.selectedMovie.emit(movie);
  }
}
