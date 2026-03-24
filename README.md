# TaskFlow v2 — Smart Task Manager

Full-stack task manager: Django REST Framework + React + Material UI

---

## Run Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/auth/register/ | Register |
| POST | /api/auth/login/ | Login |
| GET | /api/tasks/ | List tasks |
| POST | /api/tasks/ | Create task |
| PUT | /api/tasks/{id}/ | Update task |
| DELETE | /api/tasks/{id}/ | Delete task |
| GET | /api/dashboard/ | Stats |
