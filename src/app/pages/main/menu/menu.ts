import { Component } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router, RouterLink } from '@angular/router';
import { PlatoInterface } from '../../../models/plato.model';
import { SocketService } from '../../../services/socket.service';

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
  notification = false;
  constructor(
    private http: MenuService,
    private socketService: SocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.socketService.on('actualizar-estado-pedido-usuario', (data: any) => {
      console.log(data);
      this.notification = true;
    });
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
  verPlato(id: string): void {
    this.router.navigate(['/menu/plato', id]);
  }
  toggleNotification() {
    this.notification = !this.notification;
  }
}
