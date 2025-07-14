import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const url = 'https://backend-projmodel.onrender.com/api/usuarios';

  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }
  return http
    .get<any>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .pipe(
      map((response) => {
        const ans = response[0].rol === 'cocinero';
        if (ans) {
          return true;
        } else {
          router.navigate(['/menu']);
          return false;
        }
      }),
      catchError(() => {
        console.error('Error al verificar el token o la ruta');
        router.navigate(['/login']);
        return of(false);
      })
    );
};
