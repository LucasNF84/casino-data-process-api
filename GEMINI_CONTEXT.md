# GEMINI CONTEXT - Casino Data Process API

## Project Overview
**Name**: `casino-data-process-api`
**Purpose**: API for the Casino DW Admin system, handling data processing configurations and monitoring.
**Stack**: Node.js, Express, Sequelize (ORM), SQL Server (MSSQL).

## Architecture
The project follows a modular, layered architecture.

### Directory Structure
```
casino-data-process-api/
├── docs/                 # Documentation
│   └── modules/          # Detailed documentation for each module
├── src/
│   ├── config/           # Configuration (DB, Env vars)
│   ├── core/             # Core utilities (Logger, Error Handler, Response Builder)
│   ├── modules/          # Feature modules (Business logic)
│   │   ├── auth/         # Authentication (Skeleton)
│   │   ├── connections/  # Database connection configurations
│   │   ├── importTypes/  # Types of data imports (ETL, Ticket, etc.)
│   │   ├── processControl/ # Monitoring of data processes
│   │   ├── sites/        # Casino sites configuration
│   │   └── systems/      # External systems definitions
│   ├── routes/           # Dynamic route loader
│   ├── app.js            # Express app setup
│   └── server.js         # Entry point
├── .env                  # Environment variables (GitIgnored)
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore rules
├── GEMINI.md             # Agent instructions and role definition
└── package.json          # Dependencies
```

## Key Concepts

### 1. Dynamic Routing
Routes are automatically loaded from `src/modules/**/*.routes.js` by `src/routes/index.js`. This keeps `app.js` clean and allows for easy module addition.

### 2. Layered Pattern
Each module typically consists of:
- **Model** (`*.model.js`): Sequelize schema definition.
- **Controller** (`*.controller.js`): Handles HTTP requests/responses.
- **Service** (`*.service.js`): Contains business logic and DB interactions.
- **Routes** (`*.routes.js`): Defines API endpoints.

### 3. Database
- **ORM**: Sequelize
- **Dialect**: MSSQL (using `tedious` driver)
- **Configuration**: `src/config/database.js`

### 4. Error Handling
Global error handling middleware is implemented in `src/core/errorHandler.js`. All errors should be passed to `next(error)` in controllers.

## Documentation
- **Module Details**: Detailed documentation for each module (Auth, Sites, Systems, Connections, ImportTypes, ProcessControl) can be found in `docs/modules/`.
- **Agent Instructions**: See `GEMINI.md` for the agent's role and operational guidelines.

## Modules Description

- **Auth**: Handles user authentication (currently a skeleton `POST /auth/login`).
- **Sites**: Manages casino locations (`id`, `name`, `connectionId`, etc.).
- **Systems**: Defines external systems interacting with the DW (`id`, `name`, `systemCode`).
- **Connections**: Stores database connection details for different engines (`mssql`, `postgres`, etc.).
- **ImportTypes**: Defines types of data imports (e.g., 'ETL', 'Ticket').
- **ProcessControl**: Logs and monitors the status of data processing jobs (`date`, `status`, `message`).

## Running the Project
1.  Ensure SQL Server is running and accessible (TCP/IP enabled on port 1433).
2.  Configure `.env` with correct DB credentials.
3.  `npm install`
4.  `npm run dev` (uses nodemon)
