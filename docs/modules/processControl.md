# Process Control Module Documentation

## Overview
Manages data processing tasks and their status.

## Data Model (`ProcessControl`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `siteId` | INTEGER | ID of the site |
| `importTypeId` | INTEGER | ID of the import type |
| `systemNumberId` | INTEGER | ID of the system number |
| `dateProcess` | DATE | Date when the process ran |
| `referenceDate` | DATEONLY | Reference date for the data |
| `status` | STRING | Status of the process (e.g., 'Pending', 'Success') |
| `message` | STRING | Error or status message |

## Components

### Service (`processControl.service.js`)
- `findAll()`: Retrieves all process control records (Default CRUD).
- `getProcessStatus()`: Executes a raw SQL query to retrieve a detailed status report including site, connection, and system details, with calculated date ranges.

### Routes (`processControl.routes.js`)
- **GET** `/process-control`: Retrieves the detailed process status report (calls `getProcessStatus`).
- **GET** `/process-control/:id`: Get process details by ID.

### API Response Example (`GET /process-control`)
```json
[
  {
    "siteName": "Posadas Casino",
    "connectionName": "GST Casino Club",
    "system": "Gst",
    "dbhost": "192.168.227.60",
    "dbname": "SiacCentral",
    "dateFrom": "2025-11-17T00:00:00.000Z",
    "dateTo": "2025-12-02T00:00:00.000Z",
    "apibase_url": null,
    "enabled": true,
    "importType": "Contadores",
    "dateProcess": "2025-11-27T16:30:44.970Z",
    "referenceDate": "2025-11-27T00:00:00.000Z"
  }
]
```
