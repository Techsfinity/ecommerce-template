import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {AuthState} from "../shared/state/auth/auth.state";
import {UserRoles} from "../shared/models/auth/user-roles";

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles: string[] = this.store.selectSnapshot(AuthState.roles);

    if (roles && roles.length > 0 && roles.includes(UserRoles.ROLE_SUPER_ADMIN)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
