import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../services/carrito.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  error: string = '';
  mesa: number = 0;
  datosTarjeta: any = {
    numero: '',
    expiracion: '',
    cvv: '',
  };

  constructor(
    private http: CarritoService,
    private pedidoService: PedidoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mesa = params['mesa'];
    });
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
    if (metodo === 'tarjeta') {
      if (this.datosTarjeta.numero.length !== 16) {
        this.error = 'El número de tarjeta debe tener 16 dígitos';
        this.loading = false;
        return;
      }
      if (
        this.datosTarjeta.expiracion.length !== 4 ||
        isNaN(Number(this.datosTarjeta.expiracion))
      ) {
        this.error = 'La fecha de expiración debe tener 4 dígitos';
        this.loading = false;
        return;
      }
      if (this.datosTarjeta.cvv.length !== 3) {
        this.error = 'El CVV debe tener 3 dígitos';
        this.loading = false;
        return;
      }
      if (this.datosTarjeta.banco.length === 0) {
        this.error = 'El banco es requerido';
        this.loading = false;
        return;
      }
    }
    this.pedidoService.crearPedido(this.carrito).subscribe({
      next: (data) => {
        this.router.navigate(['/menu/pago/sucess'], {
          queryParams: {
            tipo: metodo,
            mesa: this.mesa,
          },
        });
      },
      error: (error) => {
        console.error('Error al crear el pedido:', error);
      },
    });
  }
}
