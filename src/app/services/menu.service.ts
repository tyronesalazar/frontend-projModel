import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatoInterface } from '../models/plato.model';

interface PlatoResponse {
  menu: PlatoInterface[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'https://backend-projmodel.onrender.com/';
  // private apiUrl = 'http://localhost:3000/';
  private getMenuUrl = this.apiUrl + 'api/platos/all';
  private getFavoritesUrl = this.apiUrl + 'api/usuarios/favorites/';
  private getPlatoUrl = this.apiUrl + 'api/platos/';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<PlatoResponse> {
    return this.http.get<any>(this.getMenuUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  getFavorites(): Observable<any> {
    return this.http.get<any>(this.getFavoritesUrl + 'all', {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  getPlato(id: string): Observable<any> {
    return this.http.get<any>(this.getPlatoUrl + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  addFavorite(id: string): Observable<any> {
    return this.http.post<any>(this.getFavoritesUrl + 'create/' + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  removeFavorite(id: string): Observable<any> {
    return this.http.delete<any>(this.getFavoritesUrl + 'delete/' + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
