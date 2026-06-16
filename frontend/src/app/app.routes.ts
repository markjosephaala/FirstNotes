import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro';
import { LoginComponent } from './components/login/login';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil';
import { HomeComponent } from './components/home/home';
import { QuizNotasComponent } from './components/quiz-notas/quiz-notas';

export const routes: Routes = [
  // Ruta por defecto: redirige al login automáticamente
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Nuestras pantallas
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'quiz-notas', component: QuizNotasComponent },
  // Ruta comodín por si escriben algo mal
  { path: '**', redirectTo: 'login' }
];