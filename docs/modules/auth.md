# Auth Module Documentation

## Overview
Login con JWT para los usuarios que administran el DW (tabla `dbo.user` de CasinoDW).

**No hay registro público.** Los usuarios se dan de alta:
- desde la pantalla **Usuarios** de la plataforma (módulo `users`, requiere estar logueado), o
- con el script `src/scripts/createUser.js` (primer usuario o recuperar el acceso).

## Protección de rutas
Todas las rutas bajo `/api` exigen `Authorization: Bearer <token>`, excepto `POST /api/login`.
Se aplica una sola vez en `src/app.js` (`requireAuth` + `PUBLIC_ROUTES`), así que un módulo nuevo queda protegido sin hacer nada.

## Endpoints

### POST /login (público)
```json
{ "email": "admin@casinoclub.com.ar", "password": "********" }
```

**200:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "username": "admin", "email": "admin@casinoclub.com.ar", "isActive": true },
    "token": "eyJhbGciOi..."
  }
}
```

**Errores:** `400` faltan datos · `401` credenciales inválidas · `403` usuario desactivado

### GET /me
Devuelve el usuario del token. `401` si no hay token o es inválido/vencido.

## Primer usuario / recuperar acceso
```sh
docker exec -it cdp-api node src/scripts/createUser.js
```
Pide email, usuario y contraseña (oculta). Si el email ya existe, le cambia la contraseña y lo activa.

## Variables de entorno
```env
JWT_SECRET=<mínimo 32 caracteres, obligatorio: la API no arranca sin él>
JWT_EXPIRES_IN=24h
```

## Notas de seguridad
- Contraseñas con bcrypt (10 rounds), mínimo 8 caracteres.
- Los tokens vencen según `JWT_EXPIRES_IN`; el front cierra la sesión ante un 401.
