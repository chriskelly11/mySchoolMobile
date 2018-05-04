import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard {
  userAuth: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    let loggedIn: boolean = false;

    this.userAuth = this.authService.loggedIn.subscribe(auth =>  {
      (auth) ? loggedIn = true : this.router.navigate(['/']);
    });

    return loggedIn;
  }

  ngOnDestroy() {
    this.userAuth.unsubscribe();
  }

}
