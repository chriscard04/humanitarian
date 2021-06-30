import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../_services/localService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private localService: LocalService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.localService.getJsonValue('currentUser')) {

            /*    if (this.localService.getJsonValue('menuItems')) {
                    var sMenu = JSON.stringify(this.localService.getJsonValue('menuItems'));
                    if (state.url !== '/abms/blank') {
                        if (!sMenu.includes(state.url)) {
                        this.router.navigate(['abms/blank']);
                        return false;
                    }
                }
               } */

            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}