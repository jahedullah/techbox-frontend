import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError, switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor{
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    }),
    withCredentials : true
  }

  constructor (private loginService : LoginService, private authService: AuthService, private router: Router){

  } 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inside interceptor")
    const refreshToken  = this.loginService.getRefreshToken();
    console.log(refreshToken)
    return next.handle(req).pipe(
        
        catchError((error: HttpErrorResponse) => {
          console.log("inside catch error")
          console.log(error.status);
          console.log(error.error.message);
          if (error.status === 401 && error.error.message.toLowerCase().startsWith('jwt expired')) {
            console.log('got the JWT expired error');
            // Handle refresh token logic here
            return this.loginService.refreshToken().pipe(
              switchMap((token: any) => {
                this.authService.setAccessToken(token);
                return next.handle(req);
              }), catchError((error) => {
                this.loginService.logout();
                this.router.navigate(['login']);
                return throwError(() => error);
              })
            );
            // return next.handle(req);
          }
          return throwError(error);
        })
      );

      // return this.userService.refreshToken().pipe(switchMap((token: any) => {
          
      //   this.storageService.saveUser(token);
      //   return next.handle(ogRequest);

      // }), catchError((error) => {

      //       this.storageService.clean();
      //       this.router.navigateByUrl('/');
      //       return throwError(() => error);
      //     } 
      //   )
      // );

  }
}

export const tokenInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
]