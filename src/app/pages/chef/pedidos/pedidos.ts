import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: `./pedidos.css`,
})
export class Pedidos {
  pedidos: any[] = [
    {
      id: 1,
      cliente: 'Carlos Pérez',
      mesa: 5,
      nota: 'Sin cebolla y extra salsa.',
      platos: [
        { nombre: 'Hamburguesa clásica', cantidad: 1 },
        { nombre: 'Papas fritas', cantidad: 1 },
      ],
      estimadoMinutos: null,
      platilloListo: false,
      estimadoInput: null,
    },
    {
      id: 2,
      cliente: 'Ana Torres',
      mesa: 3,
      nota: '',
      platos: [
        { nombre: 'Pizza Margarita', cantidad: 1 },
        { nombre: 'Gaseosa', cantidad: 2 },
      ],
      estimadoMinutos: 12,
      platilloListo: false,
      estimadoInput: null,
    },
    {
      id: 3,
      cliente: 'Luis Martínez',
      mesa: 1,
      nota: 'Platillo sin gluten.',
      platos: [{ nombre: 'Ensalada César', cantidad: 1 }],
      estimadoMinutos: 8,
      platilloListo: true,
      estimadoInput: null,
    },
  ];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    // this.pedidoService.obtenerPedidos().subscribe((pedidos) => {
    //   this.pedidos = pedidos;
    // });
  }

  enviarEstimado(pedido: any) {}

  marcarPlatilloListo(pedido: any) {}
}
