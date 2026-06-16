# 🎵 FirstNotes - Sistema de Autenticación y Editor Musical

Este proyecto es una aplicación web SPA que cuenta con un sistema completo de registro, inicio de sesión y gestión de perfil de usuario. Está desarrollado con una arquitectura desacoplada utilizando **Angular** para el Frontend y **Node.js (Express)** para el Backend, con persistencia de datos en **MariaDB/MySQL**.

---

## 🛠️ Requisitos Previos

Antes de arrancar el proyecto, asegúrate de tener instalado en tu equipo:
* **Node.js** (Versión 18 o superior recomendada) y `npm`.
* **Angular CLI** instalado globalmente (`npm install -g @angular/cli`).
* **XAMPP** (o cualquier servidor local MySQL/MariaDB).

---

## 💾 1. Configuración de la Base de Datos

1. Abre tu gestor de bases de datos (ej. MySQL Workbench o phpMyAdmin) a través de XAMPP.
2. Crea una base de datos llamada `db_firstnotes`.
3. Ejecuta la siguiente sentencia SQL para crear la tabla de usuarios:

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);
```

## 🟢 2. Configuración del Backend (Node.js + Express)
Abre una terminal y navega hasta la carpeta del backend:

Bash
cd backend
Instala todas las dependencias necesarias (esto generará tu carpeta node_modules local):

```
npm install
```
Nota de seguridad: Si utilizas credenciales de base de datos personalizadas, asegúrate de abrir el archivo index.js y editar la configuración del pool de conexión:

```
const db = mysql.createPool({
    host: 'localhost',
    user: 'tu_usuario',      // Reemplazar si es necesario
    password: 'tu_password',  // Reemplazar si es necesario
    database: 'db_firstnotes'
});
```
Inicia el servidor del backend:
```
node index.js
```
El servidor backend se ejecutará en: http://localhost:3000.

## 🔴 3. Configuración del Frontend (Angular)
Abre una nueva terminal (mantén la del backend corriendo) y navega a la carpeta del frontend:

```
cd frontend
```
Instala las dependencias del cliente:
```
npm install
```
Inicia el servidor de desarrollo de Angular:
```
ng serve
```
Una vez compilado, abre tu navegador e ingresa a: http://localhost:4200.
