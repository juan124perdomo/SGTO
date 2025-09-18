# Sistema de Gestión de Órdenes Técnicas (SGTO)

Este proyecto es una aplicación web completa para la gestión de órdenes de servicio técnico, construida con el stack PERN (PostgreSQL, Express, React, Node.js) y utilizando Prisma como ORM.

## ✨ Características Principales

- **Autenticación y Autorización por Roles**:
  - Sistema de registro e inicio de sesión seguro usando JSON Web Tokens (JWT) almacenados en cookies.
  - Tres roles de usuario definidos: **Cliente**, **Técnico** y **Administrador**.
  - Rutas protegidas según el rol del usuario para garantizar la seguridad.
- **Gestión de Órdenes de Servicio**:
  - Los clientes pueden crear, ver, actualizar y eliminar sus propias órdenes.
  - Los administradores y técnicos pueden ver todas las órdenes del sistema.
- **Flujo de Trabajo de Administración**:
  - Los administradores pueden ver todas las órdenes y eliminarlas si es necesario.
  - Asignación de órdenes a técnicos específicos.
  - Gestión de roles de usuario.
- **Flujo de Trabajo de Técnicos**:
  - Los técnicos pueden ver las órdenes que se les han asignado.
  - Pueden crear reportes técnicos detallados para cada orden.

## 🛠️ Stack Tecnológico

*   **Backend**:
    *   Node.js con Express
    *   Prisma como ORM para la gestión de la base de datos.
    *   PostgreSQL como base de datos.
    *   JSON Web Tokens (JWT) para autenticación.
    *   Zod para validación de esquemas.
*   **Frontend**:
    *   React con Vite.
    *   React Router para el enrutamiento.
    *   React Hook Form para la gestión de formularios.
    *   Context API para el manejo del estado global.
    *   Axios para las peticiones HTTP.

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos

1.  Tener instalado [Node.js](https://nodejs.org/).
2.  Tener instalado y corriendo un servidor de [PostgreSQL](https://www.postgresql.org/download/).
3.  Crear una base de datos en PostgreSQL para el proyecto.

### Configuración del Backend

1.  Navega a la carpeta del servidor:
    ```bash
    cd server
    ```
2.  Copia el archivo `.env.example` a `.env` y configura la variable `DATABASE_URL` con la cadena de conexión a tu base de datos PostgreSQL.
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Aplica las migraciones de la base de datos con Prisma:
    ```bash
    npx prisma migrate dev
    ```
5.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    El backend se ejecutará en `http://localhost:3000`.

### Configuración del Frontend

1.  En una nueva terminal, navega a la carpeta del cliente:
    ```bash
    cd client
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el cliente de desarrollo:
    ```bash
    npm run dev
    ```
    El frontend se ejecutará en `http://localhost:5173`.
