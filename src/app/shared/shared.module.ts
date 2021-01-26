import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { DetailComponent } from './components/detail/detail.component';
import { FavComponent } from './components/fav/fav.component';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [CardComponent, DetailComponent, FavComponent],
  exports: [CardComponent, DetailComponent, FavComponent, ReactiveFormsModule],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, CoreModule],
})
export class SharedModule {}
