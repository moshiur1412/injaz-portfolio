# Portfolio Website with Admin Panel

A full-stack portfolio website with an admin content management system, built with **Laravel 9** (backend API) and **React 18** (frontend).

---

## Tech Stack

### Backend
- **Laravel 9** — PHP framework with RESTful API
- **MySQL** — Relational database
- **Sanctum** — API authentication

### Frontend
- **React 18** — Component-based UI library
- **Vite 4** — Frontend build tool
- **React Router 6** — Client-side routing
- **Axios** — HTTP client for API requests

---

## Features

### Public Portfolio Page
- Dark / Light mode toggle with persistent preference
- Fully responsive design (mobile, tablet, desktop)
- Animated sections with fade-in and slide-up transitions
- Resume / CV download button
- Dynamic content loaded from the API

### Sections
| Section | Description |
|---------|-------------|
| Hero | Avatar, name, title, social links |
| Stats | Years of experience, projects completed, happy clients |
| Education | Degrees, institutions, results, years |
| Skills | Categorized skills (Backend, Database, Frontend, DevOps) |
| AI Tools | AI tools used with descriptions and links |
| Projects | Featured work with images, descriptions, links |
| Achievements | Awards and recognitions |
| Leadership | Volunteer and leadership roles |
| Publications | Published articles and profiles |
| IDEs & Tools | Development tools used |
| Contact | Contact form / information |

### Admin Panel
- Full CRUD operations for all content types
- Drag-and-drop image upload with gallery view
- Paginated listing (10 items per page)
- Server-side validation for file types and sizes
- Real-time database persistence

---

## Screenshots

### Portfolio Pages

| Light Mode | Dark Mode |
|------------|-----------|
| ![Portfolio Light Mode](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/portfolio-light.png) | ![Portfolio Dark Mode](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/portfolio-dark.png) |

### Admin Panel

| Tab | Screenshot |
|-----|------------|
| Profile | ![Admin Profile](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-profile.png) |
| Skills | ![Admin Skills](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-skills.png) |
| Projects | ![Admin Projects](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-projects.png) |
| Experiences | ![Admin Experiences](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-experiences.png) |
| Education | ![Admin Education](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-educations.png) |
| Achievements | ![Admin Achievements](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-achieves.png) |
| AI Tools | ![Admin AI Tools](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-aitools.png) |
| IDEs | ![Admin IDEs](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-ides.png) |
| Publications | ![Admin Publications](https://raw.githubusercontent.com/moshiur1412/injaz-portfolio/main/screenshorts/admin-publications.png) |

---

## Database Schema

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
│ years_experience│     │ description     │
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

### Prerequisites
- PHP ^8.0
- Composer
- Node.js ^16
- MySQL

### Step 1: Clone the Repository
```bash
git clone https://github.com/moshiur1412/injaz-portfolio.git
cd injaz-portfolio
```

### Step 2: Install PHP Dependencies
```bash
composer install
```

### Step 3: Install Node.js Dependencies
```bash
npm install
```

### Step 4: Configure Environment
```bash
cp .env.example .env
```

Open `.env` and update the following values:

```env
APP_NAME=InjazPortfolio
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=injaz_portfolio
DB_USERNAME=root
DB_PASSWORD=
```

Create the database in MySQL:
```sql
CREATE DATABASE injaz_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 5: Generate Application Key
```bash
php artisan key:generate
```

### Step 6: Run Migrations
```bash
php artisan migrate
```

### Step 7: Seed the Database
```bash
php artisan db:seed --class=PortfolioSeeder
```

### Step 8: Create Storage Symlink
```bash
php artisan storage:link
```

### Step 9: Build Frontend Assets
```bash
npm run build
```

### Step 10: Start the Development Server
```bash
php artisan serve
```

Visit **http://localhost:8000** for the public portfolio.
Visit **http://localhost:8000/admin** for the admin panel.

---

## API Endpoints

### Portfolio Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/all` | Fetch all portfolio data in one request |
| GET | `/api/profile` | Fetch profile information |
| PUT | `/api/profile` | Update profile information |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | Fetch all skills |
| POST | `/api/skills` | Create a new skill |
| PUT | `/api/skills/{id}` | Update a skill |
| DELETE | `/api/skills/{id}` | Delete a skill |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Fetch all projects |
| POST | `/api/projects` | Create a new project |
| PUT | `/api/projects/{id}` | Update a project |
| DELETE | `/api/projects/{id}` | Delete a project |

### Experiences
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/experiences` | Fetch all experiences |
| POST | `/api/experiences` | Create a new experience |
| PUT | `/api/experiences/{id}` | Update an experience |
| DELETE | `/api/experiences/{id}` | Delete an experience |

### Education
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/educations` | Create a new education entry |
| PUT | `/api/educations/{id}` | Update an education entry |
| DELETE | `/api/educations/{id}` | Delete an education entry |

### Achievements
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/achievements` | Create a new achievement |
| PUT | `/api/achievements/{id}` | Update an achievement |
| DELETE | `/api/achievements/{id}` | Delete an achievement |

### Leadership
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leaderships` | Create a new leadership entry |
| PUT | `/api/leaderships/{id}` | Update a leadership entry |
| DELETE | `/api/leaderships/{id}` | Delete a leadership entry |

### Publications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/publications` | Create a new publication |
| PUT | `/api/publications/{id}` | Update a publication |
| DELETE | `/api/publications/{id}` | Delete a publication |

### AI Tools
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai-tools` | Create a new AI tool entry |
| PUT | `/api/ai-tools/{id}` | Update an AI tool entry |
| DELETE | `/api/ai-tools/{id}` | Delete an AI tool entry |

### IDEs
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ides` | Create a new IDE entry |
| PUT | `/api/ides/{id}` | Update an IDE entry |
| DELETE | `/api/ides/{id}` | Delete an IDE entry |

### Media
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload an image |
| GET | `/api/images` | Fetch all uploaded images |

---

## Usage

### Public Portfolio
Navigate to **http://localhost:8000** to view the public-facing portfolio. All content is fetched dynamically from the API. Use the toggle in the navbar to switch between light and dark themes.

### Admin Panel
Navigate to **http://localhost:8000/admin** to access the content management interface. From here you can:
- Update profile details (name, bio, social links, stats)
- Manage skills with categories and proficiency levels
- Add, edit, or remove projects
- Manage work experiences, education, and achievements
- Upload and browse images via the gallery
- Reorder items using the `order` field

---

## Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── ApiController.php    API controller with all CRUD methods
│   │   └── Requests/               Form request validation classes
│   └── Models/                     Eloquent models (Profile, Skill, Project, etc.)
├── database/
│   ├── migrations/                 Table schemas
│   └── seeders/
│       └── PortfolioSeeder.php     Sample data seeder
├── resources/
│   ├── js/
│   │   ├── components/            Reusable React components
│   │   ├── pages/                 Page-level components
│   │   │   ├── Portfolio.jsx      Public portfolio page
│   │   │   └── AdminPanel.jsx     Admin panel page
│   │   ├── App.jsx                Root React component
│   │   └── MainApp.jsx            Entry point with router setup
│   └── css/
│       └── app.css                Global styles with CSS variables
├── routes/
│   └── api.php                    API route definitions
├── public/
│   └── build/                     Compiled Vite assets
├── composer.json
├── package.json
└── vite.config.js
```

---

## Customization

### Adding a New Content Section
1. Create the migration: `php artisan make:migration create_{table}_table`
2. Create the model: `app/Models/{ModelName}.php`
3. Add API routes in `routes/api.php`
4. Add CRUD methods in `app/Http/Controllers/ApiController.php`
5. Create React components in `resources/js/pages/`
6. Run `php artisan migrate` to apply the schema

### Styling
- Edit `resources/css/app.css` for global styles
- CSS custom properties (variables) control the color scheme
- Dark mode is activated via the `[data-theme="dark"]` attribute on the root element

---

## License

This project is for portfolio and learning purposes.

---

## Author

**Moshiur Rahman** — Full Stack Developer (Laravel & React Specialist)
- GitHub: [@moshiur1412](https://github.com/moshiur1412)

---

## Acknowledgments

- [Laravel](https://laravel.com)
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
