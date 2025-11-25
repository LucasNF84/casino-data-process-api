# SystemNumber Module Documentation

## Overview
Configuration for specific system instances associated with a Site Connection.

## Data Model (`SystemNumber`)
| Field | Type | Description |
|-------|------|-------------|
| `id` | INTEGER | Primary Key, Auto-increment |
| `name` | STRING | Name of the configuration |
| `number` | INTEGER | System number identifier |
| `importDate` | DATE | Last import date |
| `siteConnectionId` | INTEGER | Foreign Key to SiteConnection |
| `daysBack` | INTEGER | Configuration for data extraction (days back) |
| `daysForward` | INTEGER | Configuration for data extraction (days forward) |

## Associations
- Belongs to **SiteConnection**
- Has Many **ProcessControl** (Import)
