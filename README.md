# User Directory Application

A full-stack user management application built with React, .NET 8 Web API, and SQLite.

## Application Structure

**Frontend (React + TypeScript + Vite + Tailwind)**
- `UserList.tsx` - Fetches and displays users from GET /api/users. Shows loading spinner, empty state, and error messages.
- `AddUser.tsx` - Form with validation (name 2-100 chars, age 0-120, pincode 4-10 chars). Shows inline errors. On success, redirects to list with toast notification.
- `Navbar.tsx` - Top navigation bar with links to List and Add pages.
- `LoginModal.tsx` - Modal dialog that appears when accessing Add User page.

**Backend (.NET 8 + SQLite + EF Core)**
- `Program.cs` - Main entry point with CORS, Swagger, and auth configuration.
- `Endpoints/UserEndpoints.cs` - All CRUD endpoints (GET, POST, PUT, DELETE) using minimal API pattern.
- `Entities/User.cs` - Database entity.
- `DTOs/` - CreateUserDTO and UserDTO for request/response shaping.
- `Mappings/UserMapping.cs` - Extension methods for entity-DTO conversion.
- `Data/UserProfileContext.cs` - EF Core DbContext for SQLite.

**Containerization**
- `frontend/Dockerfile` - Multi-stage build using Node:22-alpine.
- `backend/Dockerfile` - Multi-stage build using .NET 8 SDK and runtime.
- `docker-compose.yml` - Orchestrates both services with volume mounts for live reload.

## Development Process

**Phase 1: Project Setup**
Created React + TypeScript + Vite project. Installed Tailwind CSS and React Router.

**Phase 2: Frontend First (Hardcoded Data)**
Built UserList with 3 hardcoded users. Created AddUser form with validation functions (name, age, city, state, pincode). Added inline error messages and success toast using react-hot-toast. Implemented Navbar with React Router for navigation.

**Phase 3: Backend & Database**
Set up .NET 8 Web API with SQLite and EF Core. Organized code into separate folders: Entities, DTOs, Endpoints, Mappings, Data. Added Swagger for API testing and documentation. Tested with local data first, then created entity and DbContext, migrated using EF Core library. Configured DbContext instance to migrate at startup.

**Phase 4: API Integration**
Connected frontend to backend. UserList fetches from GET /api/users on mount. AddUser posts to POST /api/users. Added loading spinners and error handling with toast notifications.

**Phase 5: Docker**
Created Dockerfiles for frontend (Node 22) and backend (.NET 8). Added docker-compose.yml to run both services together with volume mounts for development.

**Phase 6: Security & Authentication (Bonus - Partial)**
Integrated Auth0 OAuth2. Backend configured with JWT Bearer authentication. Frontend sends Bearer token.
Add page requires login (via Auth0 or existing username). User List remains public.

## Features Status

## Features Status

| Feature | Complete |
|---------|----------|
| List View (GET /api/users) | ✓ |
| Add View with validation (POST /api/users) | ✓ |
| Loading spinners & error handling | ✓ |
| Toast notifications | ✓ |
| Navigation bar | ✓ |
| SQLite with EF Core | ✓ |
| Swagger/OpenAPI | ✓ |
| Docker / Docker Compose | ✓ |
| OAuth2/OIDC (Auth0) | ~ (token validation issue) |
| Unit tests | ✗ |

## Usage of AI

I mostly used the built-in Copilot in VS Code for faster autocompletion, especially for Tailwind CSS classes (though I made many styling adjustments afterward). 
I used Claude for help with OAuth2 login implementation and to resolve exceptions related to dependency mismatches and build problems.

## Running the Application

### Without Docker

**Prerequisites:** Node.js 20+, .NET 8 SDK

```bash
# Terminal 1 - Start Backend
cd backend
dotnet run
# Backend runs at http://localhost:5111

# Terminal 2 - Start Frontend
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173

### With Docker
docker-compose up --build
