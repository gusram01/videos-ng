import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthGuard } from './guards/auth.guard';
import { FavsComponent } from './pages/favs/favs.component';
import { FavsGuard } from './guards/favs.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchComponent,
  },
  {
    path: 'favs',
    canActivate: [AuthGuard, FavsGuard],
    component: FavsComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
