import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private login: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      // if(this.login.isLoggedIn()){
      //   console.log(this.login.getUserRole());
      //   return true;
      // }
      // this.router.navigate(['login']);
      // return false;
      console.log("auth guard init");
      this.localStorageService.getStorageChanges().subscribe((event) => {
        console.log("event dhorsi " + event)
        if (event === 'logout' || event === 'storageChange') {
          this.login.logout();
          this.router.navigate(['/login']);
        }
      });

      console.log("auth guard can activate");
      if (this.login.getAccessToken()) {
        // If the auth token is present, return true to allow access to the route
        return true;
      } else {
        // Otherwise, navigate to the login page and log out the user
        this.router.navigate(['/login']);
        return false;
      }

    }

  
}
