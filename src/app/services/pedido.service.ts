import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://backend-projmodel.onrender.com/';
  // private apiUrl = 'http://localhost:3000/';
  private pedidosUrl = this.apiUrl + 'api/pedidos/';
  private getPedidosUrl = this.apiUrl + 'api/pedidos/';
  private getPedidosPreparacionUrl = this.apiUrl + 'api/pedidos/preparacion/';
  private getPedidosListosUrl = this.apiUrl + 'api/pedidos/listos/';
  constructor(private http: HttpClient) {}

  crearPedido(pedido: any): Observable<any> {
    return this.http.post(this.pedidosUrl, pedido);
  }
  obtenerPedidos(): Observable<any> {
    return this.http.get(this.pedidosUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  obtenerPedido(id: string): Observable<any> {
    return this.http.get(this.getPedidosUrl + id);
  }
  obtenerPedidosPreparacion(): Observable<any> {
    return this.http.get(this.getPedidosPreparacionUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  obtenerPedidosListos(): Observable<any> {
    return this.http.get(this.getPedidosListosUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
