import { Component, Input, OnInit } from '@angular/core';
import { Movies } from '../../models/movieResponse';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() movie: Movies | undefined;

  constructor() {}

  ngOnInit(): void {}
}
