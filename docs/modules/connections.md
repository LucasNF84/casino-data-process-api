# Connections Module Documentation

## Overview
Manages database and API connections.

## Data Model (`Connection`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Name of the connection |
| `systemId` | INTEGER | ID of the associated system |
| `dbhost` | STRING | Database Host |
| `dbname` | STRING | Database Name |
| `dbuser` | STRING | Database User |
| `dbport` | STRING | Database Port |
| `apiuser` | STRING | API User |
| `apibase_url` | STRING | API Base URL |

## Components

### Service (`connection.service.js`)
- `findAll()`: Retrieves all connections, including the associated `System`.
- `create(data)`: Creates a new connection.
- `update(id, data)`: Updates an existing connection.

### Routes (`connection.routes.js`)
- **GET** `/connections`: List all connections with system details.
- **POST** `/connections`: Create a new connection.
- **PUT** `/connections/:id`: Update a connection.

### API Response Example (`GET /connections`)
```json
[
  {
    "id": 2,
    "name": "GST Río Negro",
    "systemId": 1,
    "dbhost": "192.168.1.1",
    "dbname": "DB_Name",
    "System": {
      "id": 1,
      "name": "Gst"
    }
  }
]
```
