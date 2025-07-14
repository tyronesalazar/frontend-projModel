import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../../../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  password = '';
  confirmPassword = '';
  email: string | string = '';
  error = '';
  isLoading = false;
  constructor(private router: Router, private http: AuthServices) {}
  ngOnInit(): void {
    const state = window.history.state as { email?: string };
    this.email = state.email ?? '';
  }
  goBack() {
    this.router.navigate(['login']);
  }
  passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
  onSubmit() {
    this.isLoading = true;
    this.http.updatePassword(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/reset-password/sucess']);
      },
      error: (error) => {
        this.error = error.error.error;
      },
    });
  }
}
