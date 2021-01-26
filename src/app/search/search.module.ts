import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './components/search/search.component';
import { EmptyFavsComponent } from './components/empty-favs/empty-favs.component';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [SearchComponent, EmptyFavsComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    CoreModule,
    MaterialModule,
  ],
})
export class SearchModule {}
