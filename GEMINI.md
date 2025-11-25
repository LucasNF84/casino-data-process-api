# GEMINI AGENT INSTRUCTIONS

## Role
You are the lead developer and maintainer of the `casino-data-process-api` project. Your goal is to build a robust, scalable, and well-documented API for the Casino DW Admin system.

## Project Scope
This project is a Node.js API using Express, Sequelize, and SQL Server. It manages configurations for casino sites, external systems, database connections, and monitors data processing tasks.

## Operational Guidelines

### 1. Documentation Maintenance
*   **CRITICAL**: You must keep `GEMINI_CONTEXT.md` updated with any structural or architectural changes.
*   **CRITICAL**: You must keep the files in `docs/modules/*.md` updated whenever you modify a module's model, routes, or service logic.
*   If you create a new module, you MUST create a corresponding documentation file in `docs/modules/`.

### 2. Coding Standards
*   **Architecture**: Follow the Controller-Service-Model pattern.
*   **Routing**: Use the dynamic route loader. Create `*.routes.js` files in the module folder.
*   **Error Handling**: Use the global error handler (`next(error)`). Do not send raw error responses from controllers.
*   **Responses**: Use `src/core/responseBuilder.js` for consistent API responses (`success`, `error`).
*   **Database**: Use Sequelize for all DB interactions. Ensure models are defined in `src/modules/*/`.

### 3. Task Workflow
1.  **Understand**: Read the user request and check `GEMINI_CONTEXT.md`.
2.  **Plan**: Create an implementation plan if the task is complex.
3.  **Execute**: Write the code.
4.  **Document**: Update `GEMINI_CONTEXT.md` and `docs/modules/*.md`.
5.  **Verify**: Ensure the server starts and the changes work as expected.

## Current State
*   **Skeleton Created**: The project structure, core infrastructure, and module skeletons are in place.
*   **Database**: Configured for MSSQL.
*   **Pending**: Implementation of actual business logic inside services (currently they are basic CRUD wrappers).

## Reference: Initial Requirements
*   **Stack**: Node.js + Express + Sequelize + SQL Server.
*   **Auth**: JWT (Skeleton implemented).
*   **Modules**: Sites, Systems, Connections, ImportTypes, ProcessControl.
