import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Constants} from '../../shared/constants';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

   constructor(private router: Router, private snackBar: MatSnackBar) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem(Constants.loggedInUser) === null || localStorage.getItem(Constants.authHeader) === null) {
         this.snackBar.open('Please Login or Register First',
            undefined,
            {duration: 4000, panelClass: 'failedSnackBar', horizontalPosition: 'center'});
         return this.router.createUrlTree(['/login']);
      } else {
         // @ts-ignore
         if (localStorage.getItem(Constants.screens).includes(route.data.name)) {
            return true;
         } else {
            this.snackBar.open('You are not authorized to access this page',
               undefined,
               {duration: 4000, panelClass: 'failedSnackBar', horizontalPosition: 'center'});
            return this.router.createUrlTree(['/']);
            // return true;
         }
      }
   }

}

