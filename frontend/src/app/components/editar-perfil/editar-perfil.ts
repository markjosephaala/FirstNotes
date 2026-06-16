import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-perfil.html',
  styleUrls: ['./editar-perfil.css']
})

export class EditarPerfilComponent implements OnInit {
  nombre: string = '';
  idUsuario!: number;
  
  nuevoNombre: string = ''; // Variable ligada al input del formulario
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.nombre = sessionStorage.getItem('nombreUsuario') || 'Usuario';
    this.idUsuario = Number(sessionStorage.getItem('idUsuario'));
    this.nuevoNombre = this.nombre; // Inicializamos el input con el nombre actual
  }

  onGuardarCambios() {
    this.mensajeExito = '';
    this.mensajeError = '';

    this.authService.actualizarUsername(this.idUsuario, this.nuevoNombre).subscribe({
      next: (res) => {
        this.mensajeExito = '¡Nombre de usuario actualizado!';
        
        // Actualizamos la pantalla y el sessionStorage para que el cambio sea permanente
        this.nombre = res.nuevoUsername;
        sessionStorage.setItem('nombreUsuario', res.nuevoUsername);

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.mensajeError = err.error?.error || 'No se pudo actualizar el nombre';
        this.cdr.detectChanges();
      }
    });
  }
}