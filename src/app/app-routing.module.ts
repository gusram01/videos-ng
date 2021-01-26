import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauth = () => redirectUnauthorizedTo(['/']);
const redirectLogged = () => redirectLoggedInTo(['/search']);

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLogged },
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'search',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauth },
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'favs',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauth },
    loadChildren: () => import('./favs/favs.module').then((m) => m.FavsModule),
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
