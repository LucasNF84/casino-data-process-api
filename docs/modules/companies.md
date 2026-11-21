# Companies Module Documentation

## Overview
Manages corporate entities (Companies).

## Data Model (`Company`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `businessKey` | STRING | Internal code (e.g., "CORP-1") |
| `name` | STRING | Name of the company |
| `image` | STRING | URL or path to company logo |

## Components

### Service (`company.service.js`)
- `findAll()`: Retrieves all companies.
- `findById(id)`: Retrieves a company by ID.
- `create(data)`: Creates a new company.
- `update(id, data)`: Updates an existing company.
- `remove(id)`: Deletes a company.

### Routes (`company.routes.js`)
- **GET** `/companies`: List all companies.
- **GET** `/companies/:id`: Get company details.
- **POST** `/companies`: Create a new company.
- **PUT** `/companies/:id`: Update a company.
- **DELETE** `/companies/:id`: Delete a company.

### API Response Example (`GET /companies`)
```json
[
  {
    "id": 2,
    "businessKey": "1",
    "name": "Casino Club S.A.",
    "image": null
  }
]
```
