import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../../../../services/auth.service';

@Component({
  selector: 'app-email-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './email-request.html',
  styleUrl: './email-request.css',
})
export class EmailRequest {
  email = '';
  error = '';
  isLoading = false;
  constructor(private router: Router, private http: AuthServices) {}

  onSubmit() {
    this.isLoading = true;
    this.error = '';
    if (this.email === '') {
      this.error = 'Completa todos los campos.';
      this.isLoading = false;
      return;
    }
    this.verifyEmail();
  }

  verifyEmail() {
    this.http.verifyEmail(this.email).subscribe({
      next: (response) => {
        this.router.navigate(['/reset-password/verify-code'], {
          state: {
            email: this.email,
          },
        });
      },
      error: (error) => {
        this.error = error.error.error;
        this.isLoading = false;
      },
    });
  }
  goBack() {
    this.router.navigate(['/login']);
  }
}
