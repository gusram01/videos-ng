import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavsComponent } from './components/favs/favs.component';

const routes: Routes = [
  {
    path: '',
    component: FavsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavsRoutingModule {}
