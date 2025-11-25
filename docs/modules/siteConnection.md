# SiteConnection Module Documentation

## Overview
Junction table linking Sites to Connections.

## Data Model (`SiteConnection`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `siteId` | INTEGER | Foreign Key to Site |
| `connectionId` | INTEGER | Foreign Key to Connection |

## Associations
- Belongs to **Site**
- Belongs to **Connection**
- Has Many **SystemNumber**
