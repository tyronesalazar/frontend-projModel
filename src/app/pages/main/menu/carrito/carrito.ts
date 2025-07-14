import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../../services/carrito.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule, NgxSkeletonLoaderModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  carrito: any[] = [];
  tiposIngrediente = ['base', 'proteina', 'topping', 'salsa'];
  isLoading = true;
  notaCliente = '';
  mesaCliente = 0;
  constructor(private http: CarritoService, private router: Router) {}
  ngOnInit(): void {
    this.http.obtenerCarrito().subscribe((data) => {
      this.carrito = data;
      this.isLoading = false;
    });
  }
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
  calcularTotalCarrito(): number {
    return this.carrito.reduce((total, pedido) => {
      const subtotal = parseFloat(pedido.subtotal);
      return total + (isNaN(subtotal) ? 0 : subtotal);
    }, 0);
  }
  finalizarPedido() {
    this.router.navigate(['/menu/pago']);
  }
  eliminarPedido(id: number) {
    this.http.eliminarPedido(id).subscribe({
      next: (data) => {
        this.isLoading = true;
        this.http.obtenerCarrito().subscribe((data) => {
          this.carrito = data;
          this.isLoading = false;
        });
      },
      error: (error) => {
        console.error('Error al eliminar el pedido:', error);
      },
    });
  }
}
