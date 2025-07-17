import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../services/pedido.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: `./pedidos.css`,
})
export class Pedidos {
  colaPedidos: any[] = [];
  pedidosEnPreparacion: any[] = [];
  pedidosListos: any[] = [];
  pedidoSeleccionado: any = null;
  ingredientes: any[] = [];

  tiposIngrediente: string[] = [
    'Base',
    'Proteína',
    'Salsa',
    'Extras',
    'Topping',
  ];
  constructor(
    private pedidoService: PedidoService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketService.emit('conectado', 'chef');
    this.socketService.on('nuevo-pedido', (data: any) => {
      this.pedidoService.obtenerPedidos().subscribe({
        next: (pedidos) => {
          this.colaPedidos = pedidos;
        },
        error: (error) => {
          console.error('Error al obtener los pedidos:', error);
        },
      });
    });

    this.pedidoService.obtenerPedidos().subscribe({
      next: (pedidos) => {
        console.log(pedidos);
        this.colaPedidos = pedidos;
      },
      error: (error) => {
        console.error('Error al obtener los pedidos:', error);
      },
    });
    this.pedidoService.obtenerPedidosPreparacion().subscribe({
      next: (pedidos) => {
        this.pedidosEnPreparacion = pedidos;
      },
      error: (error) => {
        console.error('Error al obtener los pedidos en preparación:', error);
      },
    });
    this.pedidoService.obtenerPedidosListos().subscribe({
      next: (pedidos) => {
        this.pedidosListos = pedidos;
      },
      error: (error) => {
        console.error('Error al obtener los pedidos listos:', error);
      },
    });
  }
  seleccionarPedido(pedido: any) {
    this.pedidoSeleccionado = pedido;
  }

  cerrarDetalles() {
    this.pedidoSeleccionado = null;
  }

  empezarPreparacion(pedido: any) {
    this.pedidosEnPreparacion.push(pedido);
    this.colaPedidos = this.colaPedidos.filter(
      (p) => p.id_pedido !== pedido.id_pedido
    );
    this.socketService.emit('actualizar-estado-pedido-usuario', {
      id: pedido.id_pedido,
      estado: 'preparacion',
    });
    this.cerrarDetalles();
  }

  marcarListo(pedido: any) {
    pedido.estado = 'listo';
    this.pedidosEnPreparacion = this.pedidosEnPreparacion.filter(
      (p) => p.id_pedido !== pedido.id_pedido
    );
    this.socketService.emit('actualizar-estado-pedido-usuario', {
      id: pedido.id_pedido,
      estado: 'listo',
    });
    this.pedidosListos.push(pedido);
  }
  marcarEntregado(pedido: any) {
    pedido.estado = 'entregado';
    this.pedidosListos = this.pedidosListos.filter(
      (p) => p.id_pedido !== pedido.id_pedido
    );
    this.socketService.emit('actualizar-estado-pedido-usuario', {
      id: pedido.id_pedido,
      estado: 'entregado',
    });
  }
  filtrarIngredientes(plato: any, tipo: string) {
    return plato.ingredientes.filter(
      (i: any) => i.tipo === tipo.toLocaleLowerCase()
    );
  }
  agruparIngredientes(
    plato: any,
    tipo: string
  ): { nombre: string; cantidad: number }[] {
    const agrupados: { [nombre: string]: number } = {};

    plato.ingredientes
      .filter((i: any) => i.tipo === tipo.toLocaleLowerCase())
      .forEach((i: any) => {
        agrupados[i.nombre] = (agrupados[i.nombre] || 0) + 1;
      });

    return Object.entries(agrupados).map(([nombre, cantidad]) => ({
      nombre,
      cantidad,
    }));
  }
}
