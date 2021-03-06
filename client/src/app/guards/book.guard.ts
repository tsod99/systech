import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
   providedIn: 'root'
})
export class BookGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) {}

   canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;

          return this.checkLogin(url);
      }

      checkLogin(url: string): true | UrlTree {
         console.log("Url: " + url)
          var val:any;
         if(window.sessionStorage.getItem('token') === null) {
           val = null;
         }
        val = window.sessionStorage.getItem('token');
         if(val != null && val == "true"){
            if(url == "/login")
               return this.router.parseUrl('/adminPanel');
            else 
               return true;
         } else {
            return this.router.parseUrl('/login');
         }
      }
}