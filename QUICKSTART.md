# Sneaker Engine - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### Prerequisites Check
```bash
node -v     # Should be 20.x or higher
uv --version   # uv package manager
psql --version # PostgreSQL 16
```

### 1. Database Setup (1 minute)
```bash
# Create database and user
createdb sneaker_engine
createuser sneaker_user -P
# Password: sneaker_pass

# Grant privileges
psql -d sneaker_engine -c "GRANT ALL PRIVILEGES ON DATABASE sneaker_engine TO sneaker_user;"
```

### 2. Backend Setup (2 minutes)
```bash
cd backend
./setup.sh

# Edit .env if needed (optional)
# nano .env

# Activate virtual environment and start server
source .venv/bin/activate
uv run uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend will be running at: `http://127.0.0.1:8000`
API Docs: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup (2 minutes)
**Open a new terminal**

```bash
cd frontend
./setup.sh

# Start development server
npm run dev
```

Frontend will be running at: `http://localhost:4200`

---

## ✅ Verify Installation

1. Open `http://localhost:4200` in your browser
2. Click "Register" and create an account
3. You should be redirected to the sneakers page after registration

---

## 🎨 Theme Toggle

Click the 🌙/☀️ button in the navbar to switch between light and dark mode.

---

## 📁 Project Overview

```
sneaker-engine-v3/
├── frontend/          # Angular 20 + Vite
│   └── src/app/
│       ├── components/   # UI components
│       ├── services/     # Auth, Toast, Theme, Sneaker, Proposition
│       ├── models/       # TypeScript interfaces
│       ├── guards/       # Route guards
│       └── interceptors/ # HTTP interceptors
│
└── backend/           # FastAPI + PostgreSQL
    ├── api/           # REST endpoints
    ├── models/        # SQLAlchemy ORM
    ├── schemas/       # Pydantic validation
    └── auth.py        # JWT authentication
```

---

## 🛠️ Common Commands

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
# Activate virtual environment first
source .venv/bin/activate

# Run server
uv run uvicorn main:app --reload

# Create database migration
uv run alembic revision --autogenerate -m "description"

# Apply migrations
uv run alembic upgrade head
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (port 8000)
lsof -ti:8000 | xargs kill -9

# Frontend (port 4200)
lsof -ti:4200 | xargs kill -9
```

### Database Connection Error
- Verify PostgreSQL is running: `sudo service postgresql status`
- Check credentials in `backend/.env`
- Ensure database exists: `psql -l | grep sneaker_engine`

### Module Not Found (Frontend)
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found (Backend)
```bash
cd backend
source .venv/bin/activate
uv pip install -r requirements.txt
```

---

## 📚 Next Steps

1. **Implement Sneaker Components** - Build out the sneaker list and detail pages
2. **Add Image Upload** - Integrate image storage for sneaker photos
3. **Proposition UI** - Create forms for making buy/trade/swap offers
4. **Testing** - Add unit and integration tests
5. **Deployment** - Set up production environment

---

## 🎯 Key Features to Develop

- [ ] Sneaker list with filters and search
- [ ] Sneaker detail page with image gallery
- [ ] Create/edit sneaker form
- [ ] Proposition submission form
- [ ] Proposition inbox/outbox views
- [ ] User profile page
- [ ] Image upload functionality
- [ ] Email notifications
- [ ] Payment integration (future)

---

## 📖 Documentation

- API Docs: `http://127.0.0.1:8000/docs`
- Angular Guide: `.github/angular-llm-context.txt`
- Full Instructions: `.github/copilot-instructions.md`
- Main README: `README.md`

---

## 💡 Development Tips

1. **Always use SCSS variables** for colors (defined in `frontend/src/styles.scss`)
2. **Test in both light and dark mode** before committing
3. **Use signals** for state management in Angular
4. **Run accessibility checks** (AXE DevTools)
5. **Keep components small and focused**
6. **Handle errors gracefully** with user-friendly messages

---

## 🤝 Need Help?

- Check the main README.md
- Review `.github/copilot-instructions.md` for coding standards
- Check API docs at `/docs` endpoint
- Create an issue in the repository

---

**Happy Coding! 👟✨**
