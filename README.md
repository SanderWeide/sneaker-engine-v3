# Sneaker Engine

A modern sneaker marketplace application built with Angular 20 and FastAPI. Buy, sell, and trade sneakers with a proposition-based trading system.

## Features

- 🔐 **Authentication** - JWT-based user authentication and authorization
- 👟 **Sneaker Management** - Create, read, update, and delete sneaker listings
- 🤝 **Proposition System** - Make buy, trade, or swap offers on sneakers
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ♿ **Accessible** - WCAG AA compliant with proper ARIA labels

## Tech Stack

### Frontend
- **Angular 20.3.0** - Modern standalone components with signals
- **TypeScript 5.9.2** - Strict type checking
- **Vite** - Fast build tool and dev server
- **RxJS** - Reactive programming for async operations
- **SCSS** - Theming with CSS custom properties

### Backend
- **FastAPI** - High-performance Python web framework
- **PostgreSQL 16** - Reliable relational database
- **SQLAlchemy** - ORM for database interactions
- **Alembic** - Database migration tool
- **JWT** - Secure token-based authentication

## Prerequisites

- **Node.js** 20.9.0 or higher
- **uv** (Python package manager) - [Install uv](https://docs.astral.sh/uv/getting-started/installation/)
- **Python** 3.12 or higher (uv will manage this)
- **PostgreSQL** 16
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sneaker-engine-v3
```

### 2. Database Setup

Create a PostgreSQL database:

```bash
createdb sneaker_engine
createuser sneaker_user -P  # Set password: sneaker_pass
psql sneaker_engine -c "GRANT ALL PRIVILEGES ON DATABASE sneaker_engine TO sneaker_user;"
```

### 3. Backend Setup

```bash
cd backend
chmod +x setup.sh
./setup.sh
```

Update `backend/.env` with your database credentials if different from defaults.

Start the backend server:

```bash
source .venv/bin/activate
uv run uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at `http://127.0.0.1:8000`
API documentation: `http://127.0.0.1:8000/docs`

### 4. Frontend Setup

```bash
cd frontend
chmod +x setup.sh
./setup.sh
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:4200`

## Project Structure

```
sneaker-engine-v3/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # UI components
│   │   │   ├── services/        # Business logic
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   ├── guards/          # Route guards
│   │   │   └── interceptors/    # HTTP interceptors
│   │   ├── environments/        # Environment configs
│   │   └── styles.scss          # Global styles with theme variables
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── backend/
    ├── api/                     # API routes
    ├── models/                  # SQLAlchemy models
    ├── schemas/                 # Pydantic schemas
    ├── auth.py                  # Authentication logic
    ├── database.py              # Database configuration
    ├── main.py                  # FastAPI application
    └── requirements.txt
```

## Development Guidelines

### Frontend

- Use **signals** for local state management
- Use **computed()** for derived state
- Always use **SCSS variables** for colors (no hardcoded colors)
- Use **native control flow** (`@if`, `@for`) instead of `*ngIf`, `*ngFor`
- Use **`inject()`** instead of constructor injection
- Set **`changeDetection: ChangeDetectionStrategy.OnPush`** for performance
- Test in both light and dark modes

### Backend

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- All routes require authentication except `/auth/*`
- Use Pydantic models for request/response validation
- Use SQLAlchemy ORM for database queries
- Run Alembic migrations when changing models

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Sneakers
- `GET /api/sneakers` - List all sneakers
- `GET /api/sneakers/{id}` - Get sneaker details
- `POST /api/sneakers` - Create new sneaker
- `PUT /api/sneakers/{id}` - Update sneaker
- `DELETE /api/sneakers/{id}` - Delete sneaker

### Propositions
- `GET /api/propositions` - List propositions
- `GET /api/propositions/{id}` - Get proposition details
- `POST /api/propositions` - Create proposition
- `PUT /api/propositions/{id}/accept` - Accept proposition
- `PUT /api/propositions/{id}/reject` - Reject proposition
- `DELETE /api/propositions/{id}` - Cancel proposition

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `uv run uvicorn main:app --reload` - Start development server
- `uv run alembic revision --autogenerate -m "message"` - Create migration
- `uv run alembic upgrade head` - Apply migrations

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly (including accessibility)
4. Commit with descriptive messages
5. Push and create a pull request

## License

[Your License Here]

## Support

For issues or questions, please create an issue in the repository.
