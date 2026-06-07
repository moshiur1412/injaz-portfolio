# Portfolio Website with Admin Panel

A modern, production-ready portfolio website built with **Laravel** (backend API) and **React** (frontend). Features a beautiful public portfolio page and a full-featured admin panel for content management.

![Portfolio Home Page](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/home_page_01.png)

---

## Tech Stack

### Backend
- **Laravel 10** — PHP framework
- **MySQL** — Database
- **RESTful API** — JSON responses

### Frontend
- **React 18** — UI library
- **Vite** — Build tool
- **React Router** — Client-side routing
- **Axios** — HTTP client

---

## Features

### Public Portfolio
- Dark/Light mode toggle
- Fully responsive design
- Smooth fade-in and slide-up animations
- Download CV / resume button
- Sections: Hero, Stats, Education, Skills, Projects, Achievements, Leadership, Publications, Contact

### Admin Panel
- Full CRUD for all portfolio content
- Drag-and-drop image upload with gallery
- Paginated views (10 items per page)
- Persistent database storage
- File type and size validation

---

## Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![Light Mode](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/home_page_02.png) | ![Dark Mode](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/home_page_03.png) |

| Admin Panel |
|-------------|
| ![Admin Panel](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/home_page_04.png) |

---

## Database Schema (ERD)

```
┌─────────────────┐     ┌─────────────────┐
│    profiles     │     │     skills      │
├─────────────────┤     ├─────────────────┤
│ id              │     │ id              │
│ name            │     │ name            │
│ title           │     │ category        │
│ bio             │     │ level           │
│ email           │     │ order           │
│ phone           │     └─────────────────┘
│ location        │
│ avatar          │     ┌─────────────────┐
│ github          │     │    projects      │
│ linkedin        │     ├─────────────────┤
│ twitter         │     │ id              │
│ resume_url      │     │ title           │
│ years_exp       │     │ description      │
│ happy_clients   │     │ image           │
└─────────────────┘     │ url             │
                        │ github          │
┌─────────────────┐     │ order           │
│  experiences    │     │ is_visible      │
├─────────────────┤     └─────────────────┘
│ id              │
│ company         │     ┌─────────────────┐
│ position        │     │   education      │
│ start_date      │     ├─────────────────┤
│ end_date        │     │ id              │
│ is_current      │     │ degree          │
│ description     │     │ institution     │
│ order           │     │ result          │
└─────────────────┘     │ year            │
                        │ order           │
┌─────────────────┐     └─────────────────┘
│  achievements   │
├─────────────────┤     ┌─────────────────┐
│ id              │     │  leaderships    │
│ title           │     ├─────────────────┤
│ description     │     │ id              │
│ category        │     │ title           │
│ order           │     │ organization    │
└─────────────────┘     │ description     │
                        │ order           │
┌─────────────────┐     └─────────────────┘
│ publications    │
├─────────────────┤     ┌─────────────────┐
│ id              │     │    ai_tools     │
│ title           │     ├─────────────────┤
│ url             │     │ id              │
│ type            │     │ name            │
│ order           │     │ description     │
└─────────────────┘     │ url             │
                        │ order           │
┌─────────────────┐     └─────────────────┘
│      ides      │
├─────────────────┤
│ id              │
│ name            │
│ description     │
│ icon            │
│ order           │
└─────────────────┘
```

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/moshiur1412/injaz-portfolio.git
cd injaz-portfolio
```

### 2. Install PHP dependencies
```bash
composer install
```

### 3. Install Node.js dependencies
```bash
npm install
```

### 4. Environment setup
```bash
cp .env.example .env
```

Update `.env` with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=injaz_portfolio
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Generate application key
```bash
php artisan key:generate
```

### 6. Run migrations
```bash
php artisan migrate
```

### 7. Seed database with sample data
```bash
php artisan db:seed --class=PortfolioSeeder
```

### 8. Create storage link
```bash
php artisan storage:link
```

### 9. Build frontend
```bash
npm run build
```

### 10. Start the server
```bash
php artisan serve
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/all` | Get all portfolio data |
| GET | `/api/profile` | Get profile info |
| PUT | `/api/profile` | Update profile |
| GET | `/api/skills` | Get all skills |
| POST | `/api/skills` | Create skill |
| PUT | `/api/skills/{id}` | Update skill |
| DELETE | `/api/skills/{id}` | Delete skill |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |
| POST | `/api/upload` | Upload image |
| GET | `/api/images` | Get all uploaded images |

---

## Usage

### Public Portfolio
- **URL**: `http://localhost:8000/`
- Dark/Light mode toggle
- Responsive on all devices

### Admin Panel
- **URL**: `http://localhost:8000/admin`
- Manage portfolio content
- Upload and manage images
- Edit profile information

---

## Project Structure

```
├── app/
│   ├── Http/Controllers/    API Controllers
│   └── Models/              Eloquent Models
├── database/
│   ├── migrations/          Database Migrations
│   └── seeders/            Sample Data
├── resources/
│   ├── js/                 React Components
│   │   ├── pages/         Page Components
│   │   └── MainApp.jsx   Main App
│   └── css/                Stylesheets
├── routes/
│   └── api.php            API Routes
└── public/
    └── build/             Compiled Assets
```

---

## Customization

### Adding New Sections
1. Create migration: `php artisan make:migration create_{table}_table`
2. Create model: `app/Models/{Model}.php`
3. Add API routes: `routes/api.php`
4. Add CRUD functions in `ApiController.php`
5. Update React components in `resources/js/pages/`
6. Run migration: `php artisan migrate`

### Styling
- Edit `resources/css/app.css` for custom styles
- CSS variables used for theming
- Dark mode uses `[data-theme="dark"]` selector

---

## License

This project is for portfolio and learning purposes.

---

## Author

**Moshiur Rahman** — Full Stack Developer (Laravel & React Specialist)

---

## Acknowledgments

- [Laravel](https://laravel.com)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
