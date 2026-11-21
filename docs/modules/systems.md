# Systems Module Documentation

## Overview
Manages external systems definitions.

## Data Model (`System`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Name of the system |
| `code` | STRING | Unique code for the system |

## Components

### Service (`system.service.js`)
- `findAll()`: Retrieves all systems and calculates `sitesCount` (number of distinct sites using this system).
- `create(data)`: Creates a new system.

### Routes (`system.routes.js`)
- **GET** `/systems`: List all systems with site count.
- **POST** `/systems`: Create a new system.

### API Response Example (`GET /systems`)
```json
[
  {
    "id": 1,
    "name": "Gst",
    "code": 100,
    "sitesCount": 41
  },
  {
    "id": 2,
    "name": "Pokies",
    "code": 101,
    "sitesCount": 0
  }
]
```
