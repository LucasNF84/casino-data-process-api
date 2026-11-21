# Import Types Module Documentation

## Overview
Manages types of data imports (e.g., Contadores, Meters).

## Data Model (`ImportType`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Name of the import type |
| `code` | STRING | Unique code |

## Components

### Service (`importType.service.js`)
- `findAll()`: Retrieves all import types.
- `create(data)`: Creates a new import type.
- `update(id, data)`: Updates an existing import type.

### Routes (`importType.routes.js`)
- **GET** `/import-types`: List all import types.
- **POST** `/import-types`: Create a new import type.
- **PUT** `/import-types/:id`: Update an import type.

### API Response Example (`GET /import-types`)
```json
[
  {
    "id": 1,
    "name": "Contadores",
    "code": 100
  }
]
```
