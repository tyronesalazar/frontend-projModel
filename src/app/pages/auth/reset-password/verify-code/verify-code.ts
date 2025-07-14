import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.css',
})
export class VerifyCode {
  email: string | null = null;
  userCode = '';
  code = 0;
  error = '';

  isLoading = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const state = window.history.state as { email?: string };
    this.email = state.email ?? null;
    this.code = this.generateCode();
    console.log(this.code);
  }

  compareCodes(code: number): boolean {
    try {
      if (code == parseInt(this.userCode)) {
        return true;
      }
      return false;
    } catch (err) {
      this.error = 'Codigo invalido';
      return false;
    }
  }

  generateCode(): number {
    const number = Math.floor(100000 + Math.random() * 900000);
    return number;
  }
  onVerify() {
    this.isLoading = true;
    if (this.compareCodes(this.code)) {
      this.router.navigate(['/reset-password/update-password'], {
        state: {
          email: this.email,
        },
      });
    } else {
      this.error = 'Codigo invalido';
    }
    this.isLoading = false;
  }

  goBack() {
    this.router.navigate(['reset-password/request-email']);
  }
}
