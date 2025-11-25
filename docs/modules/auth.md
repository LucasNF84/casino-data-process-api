# Auth Module Documentation

## Overview
Handles user authentication. Currently implements a skeleton login endpoint.

## Components

### Controller (`auth.controller.js`)
- **login**: Handles user login requests.
    - **Input**: `username`, `password` (in body)
    - **Output**: JSON with `token` and `user` object (Mocked)

### Routes (`auth.routes.js`)
- **POST** `/auth/login`: Authenticates a user.
