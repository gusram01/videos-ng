import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FavsService } from '../services/favs.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FavsGuard implements CanActivate {
  constructor(private favsService: FavsService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.favsService.storedData().length < 1) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
