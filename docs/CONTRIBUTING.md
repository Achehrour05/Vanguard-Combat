# 🤝 Contributing to Vanguard Combat

We welcome contributions to Vanguard Combat! Whether improving fighter profiles, expanding martial arts technique tutorials, or enhancing the AI advisor, here is how you can help.

---

## 🛠️ Development Setup

1. Fork and clone the repository.
2. Install dependencies:
   - Backend: `pip install -r backend/requirements.txt`
   - Frontend: `cd app && npm install`
3. Run the development environment:
   - Backend: `uvicorn backend.main:app --reload`
   - Frontend: `npm run dev`

---

## 🧪 Testing Guidelines

Before opening a pull request, run all unit tests:
```bash
python -m unittest backend/test_api_endpoints.py
python -m unittest backend/test_cache.py
python -m unittest backend/test_schemas.py
```

Ensure Vite builds cleanly:
```bash
cd app
npm run build
```

---

## 📜 Commit Conventions

Follow the Conventional Commits specification:
- `feat(...)`: New functionality
- `fix(...)`: Bug fixes
- `perf(...)`: Performance optimizations
- `docs(...)`: Documentation updates
- `test(...)`: Unit and integration tests
- `refactor(...)`: Code cleanup without behavior change
