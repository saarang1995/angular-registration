import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from '../services/database.service';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
    private apiService: ApiService
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const authenticationToken = this.databaseService.getAuthenticationToken();
    if (authenticationToken && authenticationToken != "") {
      this.apiService.authenticate(authenticationToken).subscribe((response: { success: boolean, token: string }) => {
        console.log(response);
        if (response.success) {
          this.databaseService.setAuthenticationToken(response.token);
          return true;
        }
        else {
          this.databaseService.setAuthenticationToken("");
          this.router.navigateByUrl('/login');
          return false;
        }
      });
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
    // const isAuthenticated = this.databaseService.isUserLoggedIn();
    // if (isAuthenticated) {
    //   return true;
    // }
    // else {
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
  }
}
