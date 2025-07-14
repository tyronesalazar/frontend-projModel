import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private apiUrl = 'https://backend-projmodel.onrender.com/';
  private loginUrl = this.apiUrl + 'api/usuarios/login';
  private registerUrl = this.apiUrl + 'api/usuarios/create';
  private verifyEmailUrl = this.apiUrl + 'api/usuarios/check-email';
  private updatePasswordUrl = this.apiUrl + 'api/usuarios/update-password';

  constructor(private http: HttpClient) {}
  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(
      this.loginUrl,
      { correo, contrasena },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  register(nombre: string, correo: string, contrasena: string) {
    return this.http.post<any>(
      this.registerUrl,
      {
        nombre,
        correo,
        contrasena,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  verifyEmail(correo: string) {
    return this.http.post<any>(
      this.verifyEmailUrl,
      {
        correo,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  updatePassword(correo: string, password: string) {
    return this.http.post<any>(
      this.updatePasswordUrl,
      { correo, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
