# Users Module Documentation

## Overview
Alta y mantenimiento de los usuarios que administran el DW (tabla `dbo.user`). Requiere estar logueado.
No se borran usuarios: se desactivan (`isActive: false`) y dejan de poder entrar.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users` | Lista de usuarios (sin contraseña) |
| POST | `/users` | Crea un usuario: `{ username, email, password }` |
| PUT | `/users/:id` | Modifica `username`, `email`, `isActive` y, si viene, `password` |

## Reglas
- Contraseña de al menos 8 caracteres.
- `username` y `email` son únicos (`409` si ya existen).
- Un usuario no puede desactivarse a sí mismo (`400`).
- Nunca se devuelve el hash de la contraseña.
