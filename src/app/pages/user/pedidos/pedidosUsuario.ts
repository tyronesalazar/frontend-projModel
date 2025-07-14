import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServices } from '../../../services/auth.service';

@Component({
  selector: 'app-pedidos-usuario',
  imports: [CommonModule, RouterModule],
  templateUrl: './pedidosUsuario.html',
  styleUrl: './pedidosUsuario.css',
})
export class PedidosUsuario {
  pedidos: any;
  pasos: any[] = [];
  isLoading = true;

  constructor(private http: AuthServices) {}
  ngOnInit(): void {
    this.http.obtenerPedidosUsuario().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.pedidos = this.pedidos.map((p: any) => ({
          ...p,
          expandido: false,
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener los pedidos:', error);
        this.isLoading = false;
      },
    });
  }
  tiposIngrediente = ['base', 'proteina', 'topping', 'salsa'];

  filtrarIngredientes(ingredientes: any[], tipo: string) {
    return ingredientes.filter(
      (i) => i.tipo === tipo && i.tipo_accion === 'agregado'
    );
  }

  agruparIngredientes(lista: any[]) {
    const agrupados: any[] = [];
    lista.forEach((ing) => {
      const existente = agrupados.find(
        (i) => i.ingrediente_id === ing.ingrediente_id
      );
      if (existente) {
        existente.cantidad++;
      } else {
        agrupados.push({ ...ing, cantidad: 1 });
      }
    });
    return agrupados;
  }
}
