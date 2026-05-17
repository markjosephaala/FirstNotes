import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Importante para el formulario
import { AuthService } from '../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  // Modelo para capturar los datos de la vista
  usuario = {
    nombre: '',
    email: '',
    password: ''
  };

  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.mensajeExito = '';
    this.mensajeError = '';

    this.authService.registrar(this.usuario).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Usuario registrado con éxito!';
        // Limpiar el formulario
        this.usuario = { nombre: '', email: '', password: '' };
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'Ocurrió un error en el registro';
      }
    });
  }
}