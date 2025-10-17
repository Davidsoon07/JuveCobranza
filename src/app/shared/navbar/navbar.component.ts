import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  cerrarmenu()
  {
    const nav = document.getElementById('mainNav');
    if (nav?.classList.contains('show')) {
      (document.querySelector('[data-bs-target="#mainNav"]') as HTMLElement)?.click(); 
      //console.log("Hola");
      }
  }
}
