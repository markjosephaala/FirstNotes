import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginComponent {
  credenciales = {
    email: '',
    password: ''
  };

  mensajeError: string = '';
  mensajeExito: string = '';

  // 2. INYECTA EL ROUTER EN EL CONSTRUCTOR
  constructor(private authService: AuthService, private router: Router) {} 

  onLogin() {
    this.mensajeError = '';
    this.mensajeExito = '';

    this.authService.login(this.credenciales).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Bienvenido de nuevo!';
        localStorage.setItem('token', res.token);
        console.log('Token guardado con éxito:', res.token);

        // 3. REDIRIGE AL USUARIO TRAS 1.5 SEGUNDOS (para que le dé tiempo a ver el recuadro verde)
        setTimeout(() => {
          this.router.navigate(['/dashboard']); // <-- Cambia '/dashboard' por tu ruta principal
        }, 1500);
      },
      error: (err) => {
        // Manejo de errores impecable
        this.mensajeError = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }
}