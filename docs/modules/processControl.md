# ProcessControl Module Documentation

## Overview
Tracks the execution status of data processing jobs (Imports).

## Data Model (`ProcessControl` / `Import`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `siteId` | INTEGER | ID of the site being processed |
| `importTypeId` | INTEGER | ID of the import type |
| `systemNumberId` | INTEGER | ID of the system number configuration |
| `dateProcess` | DATE | Date of the process execution (Defaults to NOW) |
| `referenceDate` | DATEONLY | The business date being processed |
| `status` | STRING | Status of the process (e.g., Pending, Success, Error) |
| `message` | STRING | Optional status message or error log |

## Components

### Service (`processControl.service.js`)
- `findAll()`: Retrieves all process records.
- `findById(id)`: Retrieves a process record by ID.
- `create(data)`: Creates a new process record.
- `update(id, data)`: Updates an existing process record.

### Routes (`processControl.routes.js`)
- **GET** `/process-control`: List all process records.
- **GET** `/process-control/:id`: Get process details.
- **POST** `/process-control`: Create a new process record.
- **PUT** `/process-control/:id`: Update a process record.
