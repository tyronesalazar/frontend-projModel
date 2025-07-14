import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = 'https://backend-projmodel.onrender.com/';
  private addToCartUrl = this.apiUrl + 'api/carrito/agregar';
  private getCartUrl = this.apiUrl + 'api/carrito/';

  constructor(private http: HttpClient) {}

  agregarAlCarrito(plato: any): Observable<any> {
    return this.http.post(this.addToCartUrl, plato, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  obtenerCarrito(): Observable<any> {
    return this.http.get(this.getCartUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  eliminarPedido(id: number): Observable<any> {
    return this.http.delete(this.getCartUrl + id, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  obtenerTotalCarrito(): Observable<any> {
    return this.http.get(this.getCartUrl + 'total', {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
