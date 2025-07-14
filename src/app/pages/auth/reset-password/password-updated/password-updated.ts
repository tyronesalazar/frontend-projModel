import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-updated',
  imports: [],
  templateUrl: './password-updated.html',
  styleUrl: './password-updated.css',
})
export class PasswordUpdated {
  constructor(private renderer: Renderer2, private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }
  continue() {
    this.router.navigate(['/']);
  }
}
