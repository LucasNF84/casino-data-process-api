# Sites Module Documentation

## Overview
Manages Casino Sites configuration.

## Data Model (`Site`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Name of the site |
| `connectionId` | INTEGER | ID of the associated database connection |
| `regionId` | INTEGER | ID of the region |
| `companyId` | INTEGER | ID of the company |

## Components

### Service (`site.service.js`)
- `findAll()`: Retrieves all sites.
- `findById(id)`: Retrieves a site by ID.
- `create(data)`: Creates a new site.
- `update(id, data)`: Updates an existing site.
- `remove(id)`: Deletes a site.

### Routes (`site.routes.js`)
- **GET** `/sites`: List all sites.
- **GET** `/sites/:id`: Get site details.
- **POST** `/sites`: Create a new site.
- **PUT** `/sites/:id`: Update a site.
- **DELETE** `/sites/:id`: Delete a site.
