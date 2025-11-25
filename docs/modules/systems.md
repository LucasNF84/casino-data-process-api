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
- `findAll()`: Retrieves all systems.
- `create(data)`: Creates a new system.

### Routes (`system.routes.js`)
- **GET** `/systems`: List all systems.
- **POST** `/systems`: Create a new system.
