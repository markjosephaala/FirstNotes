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
    console.log('Login ejecutado');
    this.mensajeError = '';
    this.mensajeExito = '';

    this.authService.login(this.credenciales).subscribe({
      next: (res) => {

  this.mensajeExito = '¡Bienvenido de nuevo!';

  if (res.usuario) { 
          sessionStorage.setItem('nombreUsuario', res.usuario.username);
          sessionStorage.setItem('idUsuario', String(res.usuario.id));
          console.log("")
        }
        
        // Si tu backend guarda el token en el sessionStorage, también iría aquí:
        if (res.token) {
          sessionStorage.setItem('token', res.token);
        }

  console.log('Intentando redirigir a /editar-perfil...');
  
  this.router.navigate(['/home'])
  .then(nav => {
    console.log('¿Redirección al Home exitosa?:', nav);
  })
  .catch(err => {
    console.error('Error al redirigir al Home:', err);
  });
},
      error: (err) => {
        this.mensajeError = err.error?.error || 'Error al iniciar sesión';
      }
    });
  }
}