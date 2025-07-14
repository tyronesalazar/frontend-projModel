import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../services/carrito.service';
import { Router, RouterLink } from '@angular/router';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-pago',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
})
export class Pago {
  total: number = 0;
  metodoPago: string = 'tarjeta';
  datosTarjeta: any = {
    numero: '',
    expira: '',
    cvv: '',
  };

  constructor(
    private http: CarritoService,
    private socketService: SocketService,
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
  }
  confirmarPago(metodo: string) {
    this.router.navigate(['/menu/pago/sucess'], {
      queryParams: {
        tipo: metodo,
        mesa: '1',
      },
    });
  }
}
