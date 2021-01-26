import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavsRoutingModule } from './favs-routing.module';
import { MaterialModule } from '../material/material.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { FavsComponent } from './components/favs/favs.component';

@NgModule({
  declarations: [FavsComponent],
  imports: [
    CommonModule,
    FavsRoutingModule,
    SharedModule,
    MaterialModule,
    CoreModule,
  ],
})
export class FavsModule {}
