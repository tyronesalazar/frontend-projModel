import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../services/carrito.service';
import { Router, RouterLink } from '@angular/router';
import { SocketService } from '../../../services/socket.service';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pago',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
})
export class Pago {
  total: number = 0;
  metodoPago: string = 'tarjeta';
  loading: boolean = false;
  carrito: any[] = [];
  userId: number = 0;
  datosTarjeta: any = {
    numero: '',
    expira: '',
    cvv: '',
  };

  constructor(
    private http: CarritoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.http.obtenerTotalCarrito().subscribe({
      next: (data) => {
        this.total = data.total;
      },
      error: (error) => {
        console.error('Error al obtener el total del carrito:', error);
      },
    });
    this.http.obtenerCarrito().subscribe({
      next: (data) => {
        this.carrito = data;
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      },
    });
  }
  confirmarPago(metodo: string) {
    this.loading = true;
    this.pedidoService.crearPedido(this.carrito).subscribe({
      next: (data) => {
        this.router.navigate(['/menu/pago/sucess'], {
          queryParams: {
            tipo: metodo,
            mesa: '1',
          },
        });
      },
      error: (error) => {
        console.error('Error al crear el pedido:', error);
      },
    });
  }
}
