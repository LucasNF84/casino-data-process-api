# ImportTypes Module Documentation

## Overview
Defines the types of data imports available in the system (e.g., ETL, Ticket).

## Data Model (`ImportType`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Name of the import type |
| `description` | STRING | Description of the import type |

## Components

### Service (`importType.service.js`)
- `findAll()`: Retrieves all import types.
- `create(data)`: Creates a new import type.
- `update(id, data)`: Updates an existing import type.

### Routes (`importType.routes.js`)
- **GET** `/import-types`: List all import types.
- **POST** `/import-types`: Create a new import type.
- **PUT** `/import-types/:id`: Update an import type.
