import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../../services/auth-services.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    // Check if the request URL matches the login or register endpoints
    const isAuthRequest = req.url.includes('/authenticate') || req.url.includes('/register');

    if (!isAuthRequest && authToken) {
      // If the request is not for login/register and there is a token, attach the token
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(cloned);
    }

    // For login/register or if no token, send request as is
    return next.handle(req);
  }
}
