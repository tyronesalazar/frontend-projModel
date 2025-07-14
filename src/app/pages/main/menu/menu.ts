import { Component } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router, RouterLink } from '@angular/router';
import { PlatoInterface } from '../../../models/plato.model';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, NgxSkeletonLoaderModule, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  menuItems: PlatoInterface[] = [];
  menuFavorites: PlatoInterface[] = [];
  errorGettinAll = false;
  error = '';
  isLoading = true;
  placeHolder = [1, 2, 3, 4];
  constructor(
    private http: MenuService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.getFavorites().subscribe({
      next: (response) => {
        if (response.error) {
          this.menuFavorites = [];
          return;
        }
        this.menuFavorites = response;
      },
      error: (error) => {},
    });
    this.http.getMenu().subscribe({
      next: (response) => {
        this.menuItems = response.menu;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching menu:', error);
      },
    });
  }
  agregar(plato: any): void {
    // this.socketServive.emit('nuevo-pedido', plato);
  }
  verPlato(id: string): void {
    this.router.navigate(['/menu/plato', id]);
  }
}
