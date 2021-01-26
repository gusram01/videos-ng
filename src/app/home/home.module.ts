import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    MaterialModule,
    SharedModule,
  ],
})
export class HomeModule {}
