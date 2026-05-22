import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro';
import { LoginComponent } from './components/login/login';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil';

export const routes: Routes = [
  // Ruta por defecto: redirige al login automáticamente
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Nuestras pantallas
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  // Ruta comodín por si escriben algo mal
  { path: '**', redirectTo: 'login' }
];