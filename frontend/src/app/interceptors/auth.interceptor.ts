import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { authUrl } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh = false;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.cookieService.get('accessToken')}`,
      },
    });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !this.refresh) {
          this.refresh = true;

          return this.http
            .post(
              authUrl + 'token',
              { refreshToken: this.cookieService.get('refreshToken') },
              { withCredentials: true }
            )
            .pipe(
              switchMap((res: any) => {
                this.cookieService.set('accessToken', res.accessToken);
                return next.handle(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${res.accessToken}`,
                    },
                  })
                );
              })
            );
        }
        this.refresh = false;
        return throwError(() => {
          err;
        });
      })
    );
  }
}
