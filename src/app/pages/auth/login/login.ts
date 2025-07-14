import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServices } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  constructor(private http: AuthServices, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    if (this.username === '' || this.password === '') {
      this.errorMessage = 'Por favor, complete todos los campos.';
      this.isLoading = false;
      return;
    }
    this.errorMessage = '';
    this.login();
  }

  login() {
    this.http.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        if (response.rol == 'cocinero') {
          this.router.navigate(['/cocina/pedidos']);
        } else {
          this.router.navigate(['/menu']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error.error;
        this.isLoading = false;
      },
    });
  }
}
