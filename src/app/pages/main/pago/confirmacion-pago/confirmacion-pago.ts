import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmacion-pago',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './confirmacion-pago.html',
  styleUrl: './confirmacion-pago.css',
})
export class ConfirmacionPago {
  tipo!: string;
  mesa!: any;
  isLoading = true;

  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    this.router.queryParamMap.subscribe({
      next: (params) => {
        this.tipo = params.get('tipo') ?? 'tarjeta';
        this.mesa = params.get('mesa') ?? 0;
        this.isLoading = false;
      },
    });
  }
}
