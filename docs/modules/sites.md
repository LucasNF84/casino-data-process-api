# Sites Module Documentation

## Overview
Manages Casino Sites configuration and their relationships with Regions, Companies, Connections, and Import Types.

## Data Model (`Site`)
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `id` | INTEGER | Primary Key, Auto-increment | Auto |
| `businessKey` | INTEGER | Internal business identifier (must be a number) | No |
| `name` | STRING(150) | Name of the site | Yes |
| `enabled` | BOOLEAN (bit) | Whether the site is active | No (default: true) |
| `regionId` | INTEGER | Foreign key to Region | No |
| `companyId` | INTEGER | Foreign key to Company | No |
| `createdAt` | DATETIME | Creation timestamp | Auto (NOT NULL) |
| `updatedAt` | DATETIME | Last update timestamp | Auto (nullable) |

## Components

### Service (`site.service.js`)
- `findAll()`: Retrieves all sites with nested associations (`Region`, `Company`, `SiteConnections` -> `Connection`, `SystemNumber`, `SiteImportTypes` -> `ImportType`).
- `findById(id)`: Retrieves a site by ID with full nested details.
- `create(data)`: Creates a new site.
- `update(id, data)`: Updates an existing site.
- `remove(id)`: Deletes a site.

### Routes (`site.routes.js`)
- **GET** `/sites`: List all sites with nested data.
- **GET** `/sites/:id`: Get site details by ID.
- **POST** `/sites`: Create a new site.
- **PUT** `/sites/:id`: Update a site.
- **DELETE** `/sites/:id`: Delete a site.

### POST/PUT Payload Examples

**Create Site (POST /sites):**
```json
{
  "name": "Casino Central",
  "businessKey": 1001,
  "regionId": 1,
  "companyId": 2,
  "enabled": true,
  "siteConnections": [
    {
      "connectionId": 5,
      "SystemNumbers": [
        {
          "name": "Tragamonedas Hall",
          "number": 101,
          "importDate": "2025-11-30T00:00:00.000Z",
          "daysBack": 30,
          "daysForward": 7
        }
      ]
    },
    {
      "connectionId": 8,
      "SystemNumbers": []
    }
  ]
}
```

**Update Site (PUT /sites/:id):**
```json
{
  "name": "Casino Central Editado",
  "businessKey": 1001,
  "siteConnections": [
    {
      "id": 10,
      "connectionId": 5,
      "SystemNumbers": [
        {
          "id": 50,
          "name": "Tragamonedas Hall Editado",
          "number": 101,
          "daysBack": 45
        },
        {
          "name": "Nuevo Sector",
          "number": 103,
          "daysBack": 30
        }
      ]
    }
    // Connections missing from this list will be deleted
  ]
}
```

**Important Notes:**
- ⚠️ `businessKey` **MUST be a number**, not a string (e.g., `2232323`, not `"2232323"`)
- `createdAt` and `updatedAt` are managed automatically by the backend - **DO NOT send them**
- Only `name` is required when creating a site
- `enabled` defaults to `true` if not provided
- All IDs (`regionId`, `companyId`) must be numbers
- **Fechas (`importDate`):** Se recomienda enviar en formato ISO 8601 (`YYYY-MM-DD` o `YYYY-MM-DDTHH:mm:ss`). El backend se encargará de formatearlo correctamente para la base de datos.

### API Response Examples

**GET /sites (List all sites):**
```json
[
  {
    "id": 4,
    "businessKey": 108,
    "name": "Posadas Casino",
    "enabled": true,
    "regionId": 1,
    "companyId": 2,
    "createdAt": "2022-11-17T00:00:00.000Z",
    "updatedAt": null,
    "Region": {
      "id": 1,
      "businessKey": 111111,
      "name": "Posadas"
    },
    "Company": {
      "id": 2,
      "businessKey": 1,
      "name": "Casino Club S.A.",
      "image": null
    },
    "SiteConnections": [
      {
        "id": 2,
        "siteId": 4,
        "connectionId": 5,
        "Connection": {
          "id": 5,
          "name": "GST Casino Club"
        },
        "SystemNumbers": [
          {
            "id": 5,
            "name": "Posadas Casino Peso",
            "number": 954,
            "importDate": "2024-01-01T00:00:00.000Z",
            "siteConnectionId": 2,
            "daysBack": 10,
            "daysForward": 5
          }
        ]
      }
    ],
    "SiteImportTypes": [
      {
        "id": 1,
        "siteId": 4,
        "importTypeId": 2,
        "ImportType": {
          "id": 2,
          "name": "tkt-consumed",
          "code": 101
        }
      }
    ]
  }
]
```

### Error Response Examples

**409 Conflict (Duplicate Entry):**
```json
{
    "success": false,
    "error": {
        "code": 409,
        "message": "El registro ya existe. Verifique que los datos sean únicos."
    }
}
```

**409 Conflict (Delete Restriction):**
```json
{
    "success": false,
    "error": {
        "code": 409,
        "message": "No se puede eliminar el registro porque está siendo utilizado por otra entidad."
    }
}
```
