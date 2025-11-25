# Connections Module Documentation

## Overview
Manages database connection strings and credentials for different engines.

## Data Model (`Connection`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Connection name |
| `engine` | STRING | Database engine (mssql, postgres, oracle, mysql) |
| `host` | STRING | Database host |
| `port` | INTEGER | Database port |
| `username` | STRING | Database username |
| `password` | STRING | Database password |
| `database` | STRING | Database name |

## Components

### Service (`connection.service.js`)
- `findAll()`: Retrieves all connections.
- `create(data)`: Creates a new connection.
- `update(id, data)`: Updates an existing connection.

### Routes (`connection.routes.js`)
- **GET** `/connections`: List all connections.
- **POST** `/connections`: Create a new connection.
- **PUT** `/connections/:id`: Update a connection.
