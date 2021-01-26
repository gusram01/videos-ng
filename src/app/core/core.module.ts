import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PosterPipe } from './pipes/poster.pipe';
import { BackdropPipe } from './pipes/backdrop.pipe';
import { SecuredPipe } from './pipes/secured.pipe';

@NgModule({
  declarations: [PosterPipe, BackdropPipe, SecuredPipe],
  imports: [HttpClientModule, FontAwesomeModule],
  exports: [
    HttpClientModule,
    FontAwesomeModule,
    PosterPipe,
    BackdropPipe,
    SecuredPipe,
  ],
})
export class CoreModule {}
