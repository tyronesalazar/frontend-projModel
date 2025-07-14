import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'https://backend-projmodel.onrender.com/';
  private getPedidosUrl = this.apiUrl + 'api/pedidos/';
  private createPedidoUrl = this.apiUrl + 'api/pedidos/';
  constructor(private http: HttpClient) {}

  crearPedido(pedido: any): Observable<any> {
    return this.http.post(this.createPedidoUrl, pedido);
  }
  obtenerPedidos(): Observable<any> {
    return this.http.get(this.getPedidosUrl, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  obtenerPedido(id: string): Observable<any> {
    return this.http.get(this.getPedidosUrl + id);
  }
}
