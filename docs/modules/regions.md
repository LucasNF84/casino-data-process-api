# Regions Module Documentation

## Overview
Manages geographical or logical regions.

## Data Model (`Region`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `businessKey` | STRING | Internal code for the region |
| `name` | STRING | Name of the region |

## Components

### Service (`region.service.js`)
- `findAll()`: Retrieves all regions.
- `findById(id)`: Retrieves a region by ID.
- `create(data)`: Creates a new region.
- `update(id, data)`: Updates an existing region.
- `remove(id)`: Deletes a region.

### Routes (`region.routes.js`)
- **GET** `/regions`: List all regions.
- **GET** `/regions/:id`: Get region details.
- **POST** `/regions`: Create a new region.
- **PUT** `/regions/:id`: Update a region.
- **DELETE** `/regions/:id`: Delete a region.

### API Response Example (`GET /regions`)
```json
[
  {
    "id": 1,
    "businessKey": "111111",
    "name": "Posadas"
  }
]
```
