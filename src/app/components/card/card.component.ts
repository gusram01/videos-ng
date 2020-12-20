import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movies } from '../../models/movieResponse';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() movie: Movies | undefined;

  constructor(private details: MatDialog) {}

  ngOnInit(): void {}

  openDetails(id: number) {
    const detailsRef = this.details.open(DetailComponent, {
      data: { id },
    });
  }
}
