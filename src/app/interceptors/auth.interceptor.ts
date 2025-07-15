import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const esRutaPublica =
    req.url.includes('/login') ||
    req.url.includes('/registro') ||
    req.url.includes('/check-email') ||
    req.url.includes('/reset-password/verify-code');
  if (esRutaPublica) {
    return next(req);
  }
  if (!token) {
    router.navigate(['/login']);
    throwError(() => {});
  }
  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized request - redirecting to login');
      }
      console.log(error);
      router.navigate(['/login']);
      return throwError(() => error);
    })
  );
};
