import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuService } from '../../../../services/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../../../services/carrito.service';

@Component({
  selector: 'app-plato',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './plato.html',
  styleUrl: './plato.css',
})
export class Plato {
  idPlato!: string;
  plato: any;
  loading = true;
  isLoading = false;
  isLoadingFavorito = true;

  seleccion = {
    base: '',
    proteina: '',
  };

  baseOpciones: any[] = [];

  proteinaOpciones: any[] = [];

  extraOpciones: any[] = [];

  salsaOpciones: any[] = [];

  esFavorito: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: MenuService,
    private carritoService: CarritoService,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPlato = this.route.snapshot.params['id'];
    this.http.getPlato(this.idPlato).subscribe({
      next: (response) => {
        this.plato = response.plato[0];
        this.baseOpciones = response.ingredientes.filter(
          (ingrediente: any) => ingrediente.tipo === 'base'
        );
        for (const element of this.baseOpciones) {
          element.img = this.extraerId(element.img);
        }
        this.proteinaOpciones = response.ingredientes.filter(
          (ingrediente: any) => ingrediente.tipo === 'proteina'
        );
        for (const element of this.proteinaOpciones) {
          element.img = this.extraerId(element.img);
        }
        this.extraOpciones = response.ingredientes.filter(
          (ingrediente: any) => ingrediente.tipo === 'topping'
        );
        this.extraOpciones.forEach((extra) => {
          extra.cantidad = 0;
        });

        this.salsaOpciones = response.ingredientes.filter(
          (ingrediente: any) => ingrediente.tipo === 'salsa'
        );
        this.salsaOpciones.forEach((salsa) => {
          salsa.seleccionada = false;
        });
        this.loading = false;
        this.menuService.getFavorites().subscribe({
          next: (data) => {
            if (data.length > 0) {
              this.esFavorito = data.some(
                (favorito: any) => favorito.id === this.plato.id
              );
            }
            this.isLoadingFavorito = false;
          },
          error: (error) => {
            console.error('Error al obtener favoritos:', error);
            this.isLoadingFavorito = false;
          },
        });
      },
      error: (error) => {},
    });
  }
  extraerId(url: string): string {
    const partes = url.split('/');
    return partes[partes.length - 1];
  }
  calcularTotal(): number {
    let total = parseFloat(this.plato.precio);

    // BASE
    const base = this.baseOpciones.find(
      (b) => b.nombre === this.seleccion.base
    );

    if (base) total += parseInt(base.extra_costo) || 0;

    // PROTEÍNA
    const prot = this.proteinaOpciones.find(
      (p) => p.nombre === this.seleccion.proteina
    );
    if (prot) total += parseInt(prot.extra_costo) || 0;

    // EXTRAS;
    for (const extra of this.extraOpciones) {
      total += (extra.extra_costo || 0) * (extra.cantidad || 0);
    }

    // SALSAS;

    for (const salsa of this.salsaOpciones) {
      if (salsa.seleccionada) {
        total += parseFloat(salsa.extra_costo) || 0;
      }
    }

    return total;
  }

  agregarAlPedido() {
    this.isLoading = true;
    if (!this.seleccion.base || !this.seleccion.proteina) {
      alert('Debes elegir una base y una proteína para continuar.');
      return;
    }
    const base = this.baseOpciones.find(
      (b) => b.nombre === this.seleccion.base
    );
    const proteina = this.proteinaOpciones.find(
      (p) => p.nombre === this.seleccion.proteina
    );

    const extras = this.extraOpciones
      .filter((e) => e.cantidad && e.cantidad > 0)
      .map((e) => ({
        nombre: e.nombre,
        cantidad: e.cantidad,
        extra_costo: e.extra_costo,
      }));

    const salsas = this.salsaOpciones
      .filter((s) => s.seleccionada)
      .map((s) => ({
        nombre: s.nombre,
        extra_costo: s.extra_costo,
      }));

    const pedidoFinal = {
      id_menu: this.idPlato,
      plato: this.plato.nombre,
      precio_base: this.plato.precio,
      base: base
        ? { nombre: base.nombre, extra_costo: base.extra_costo }
        : null,
      proteina: proteina
        ? { nombre: proteina.nombre, extra_costo: proteina.extra_costo }
        : null,
      extras,
      salsas,
      total: this.calcularTotal(),
      cantidad: 1,
    };

    console.log('Pedido final:', pedidoFinal);
    this.carritoService.agregarAlCarrito(pedidoFinal).subscribe({
      next: (data) => {
        console.log('Pedido agregado:', data);
        this.isLoading = false;
        this.router.navigate(['/menu/carrito']);
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
        this.isLoading = false;
      },
    });
  }

  cambiarCantidad(extra: any, delta: number) {
    extra.cantidad = Math.max(0, extra.cantidad + delta);
  }
  marcarFavorito() {
    this.isLoadingFavorito = true;
    this.esFavorito = !this.esFavorito;
    if (this.esFavorito) {
      this.menuService.addFavorite(this.idPlato).subscribe({
        next: (data) => {
          this.isLoadingFavorito = false;
          console.log(data);
        },
        error: (error) => {
          console.error('Error al agregar favorito:', error);
          this.isLoadingFavorito = false;
        },
      });
    } else {
      this.menuService.removeFavorite(this.idPlato).subscribe({
        next: (data) => {
          console.log(data);
          this.isLoadingFavorito = false;
        },
      });
    }
  }
}
