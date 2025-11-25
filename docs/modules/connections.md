# Connections Module Documentation

## Overview
Manages database connection strings and credentials for different engines.

## Data Model (`Connection`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Connection name |
| `systemId` | INTEGER | Foreign Key to System |
| `dbhost` | STRING | Database host |
| `dbname` | STRING | Database name |
| `dbuser` | STRING | Database username |
| `dbpassword` | STRING | Database password |
| `dbport` | INTEGER | Database port |
| `apiuser` | STRING | API username (if applicable) |
| `apipassword` | STRING | API password (if applicable) |
| `apibase_url` | STRING | API Base URL (if applicable) |

## Components

### Service (`connection.service.js`)
- `findAll()`: Retrieves all connections.
- `create(data)`: Creates a new connection.
- `update(id, data)`: Updates an existing connection.

### Routes (`connection.routes.js`)
- **GET** `/connections`: List all connections.
- **POST** `/connections`: Create a new connection.
- **PUT** `/connections/:id`: Update a connection.
