import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // La URL de tu backend de Node.js
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Método para registrar al usuario
  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/registro`, usuario);
  }

  // Método para logear al usuario
  login(credenciales: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/api/auth/login`, credenciales);
}

// Método para actualizar username
  actualizarUsername(id: number, nuevoUsername: string): Observable<any> {
    // Pasamos el nuevo username dentro de un objeto en el cuerpo de la petición
    return this.http.put(`${this.apiUrl}/api/auth/usuario/${id}`, { username: nuevoUsername });
  }
}