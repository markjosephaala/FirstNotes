import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, // Asegúrate de mantenerlo standalone si tu app usa esta arquitectura
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Leemos el nombre exactamente igual que en editar-perfil
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario') || 'Usuario';
  }

  onLogout() {
    // Limpiamos los datos de la sesión
    sessionStorage.clear(); // Borra token, nombreUsuario, idUsuario, etc.
    
    // Redirigimos al usuario al login
    this.router.navigate(['/login']);
  }
}