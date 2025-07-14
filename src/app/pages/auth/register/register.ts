import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private http: AuthServices, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    if (this.name === '' || this.password === '' || this.email === '') {
      this.errorMessage = 'Por favor, complete todos los campos.';
      this.isLoading = false;
      return;
    }
    this.errorMessage = '';
    this.register();
  }
  register() {
    this.http.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/login'], {
          queryParams: { correo: response.correo },
        });
      },
      error: (error) => {
        this.errorMessage = error.error.error;
        this.isLoading = false;
      },
    });
  }
}
