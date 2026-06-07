# Portfolio Website with Admin Panel

A full-stack portfolio content management system built with **Laravel 9** (RESTful API) and **React 18** (SPA frontend). Features a dynamic public portfolio page with configurable sections, smart nav menu with scroll-based active state, and a secure admin panel for managing all content.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                               │
│                                                                          │
│  ┌──────────────────────┐          ┌──────────────────────────────────┐  │
│  │   Portfolio Page      │          │        Admin Panel (SPA)         │  │
│  │   - Dynamic sections  │          │   - Profile / Skills / Projects  │  │
│  │   - Light/Dark mode   │ ◄──────► │   - Auth (Sanctum token)        │  │
│  │   - Responsive UI     │          │   - Sections Manager (drag-drop)│  │
│  └──────────────────────┘          │   - Image Upload / Gallery       │  │
│                                    │   - Change Password              │  │
│                                    └──────────────────────────────────┘  │
└──────────────────────────┬───────────────────────────────────────────────┘
                           │ REST API (JSON)
                           ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         LARAVEL BACKEND                                  │
│                                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────────────┐   │
│  │ Auth Routes │  │ Public     │  │ Admin      │  │  Middleware       │   │
│  │ /api/login │  │ Routes     │  │ Routes     │  │  auth:sanctum    │   │
│  │ /api/logout│  │ /api/all   │  │ (CRUD)     │  │                  │   │
│  │ /api/check │  │ /api/profile│  │ PUT/POST/  │  │  Token-based     │   │
│  │ /api/change-│  │ /api/skills│  │ DELETE     │  │  authentication  │   │
│  │ password   │  │ /api/sections│  │ per model  │  │                  │   │
│  └────────────┘  └─────┬───────┘  └──────┬─────┘  └──────────────────┘   │
│                        │                  │                               │
│                        ▼                  ▼                               │
│              ┌────────────────────────────────────┐                       │
│              │         Controllers                │                       │
│              │  ApiController  │  AuthController  │                       │
│              └────────────────┬───────────────────┘                       │
│                               │                                           │
│                               ▼                                           │
│              ┌────────────────────────────────────┐                       │
│              │         Eloquent Models            │                       │
│              │  Profile, Skill, Project, Section  │                       │
│              │  Experience, Education, AITool...  │                       │
│              └────────────────┬───────────────────┘                       │
│                               │                                           │
│                               ▼                                           │
│              ┌────────────────────────────────────┐                       │
│              │            MySQL Database          │                       │
│              │    profiles │ skills │ sections    │                       │
│              │    projects │ experiences │ ...    │                       │
│              └────────────────────────────────────┘                       │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## System Workflow

```
PUBLIC PORTFOLIO FLOW                    ADMIN PANEL FLOW
══════════════════════                    ════════════════

User opens site                        Admin navigates to /login
        │                                        │
        ▼                                        ▼
  React SPA loads                     Login form (username/password)
        │                                        │
        ▼                                        ▼
  GET /api/sections                    POST /api/login
  (returns visible sections)              │
        │                                ▼
        ▼                         San token stored in
  GET /api/all                     localStorage
  (returns all content)                 │
        │                                ▼
        ▼                         Admin Panel renders
  Render sections + nav           with auth header
  menu items from                 on every request
  sections data                         │
        │                                ▼
  Nav links auto-highlight         Admin Panel renders
  via IntersectionObserver         with dynamic tabs
  via IntersectionObserver         (hidden sections omitted)
  on scroll                              │
        │                                ▼
        ▼                         CRUD via protected APIs
  Dynamic portfolio               (auth:sanctum middleware)
  with toggleable                 Sections drag-and-drop
  dark/light mode                 Toast notifications (bottom-right)
```

---

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────┐       ┌─────────────────────────┐
│         users           │       │        sections          │
├─────────────────────────┤       ├─────────────────────────┤
│ id (PK)                 │       │ id (PK)                 │
│ name                    │       │ key (UNIQUE)            │
│ username (UNIQUE)       │       │ label                   │
│ email (UNIQUE)          │       │ is_visible (bool)       │
│ password                │       │ order (int)             │
│ remember_token          │       │ created_at              │
│ timestamps              │       │ updated_at              │
└─────────────────────────┘       └─────────────────────────┘

┌─────────────────────────┐       ┌─────────────────────────┐
│        profiles         │       │         skills          │
├─────────────────────────┤       ├─────────────────────────┤
│ id (PK)                 │       │ id (PK)                 │
│ name, title, bio        │       │ name                    │
│ email, phone, location  │       │ category                │
│ avatar, github          │       │ level (int 1-6)         │
│ linkedin, twitter       │       │ order (int)             │
│ resume_url              │       │ timestamps              │
│ years_experience        │       └─────────────────────────┘
│ happy_clients           │
│ timestamps              │       ┌─────────────────────────┐
└─────────────────────────┘       │        projects         │
                                  ├─────────────────────────┤
┌─────────────────────────┐       │ id (PK)                 │
│      experiences        │       │ title                   │
├─────────────────────────┤       │ description             │
│ id (PK)                 │       │ image, url, github      │
│ company, position       │       │ order (int)             │
│ start_date, end_date    │       │ is_visible (bool)       │
│ is_current (bool)       │       │ timestamps              │
│ description             │       └─────────────────────────┘
│ order (int)             │
│ timestamps              │       ┌─────────────────────────┐
└─────────────────────────┘       │       education         │
                                  ├─────────────────────────┤
┌─────────────────────────┐       │ id (PK)                 │
│      achievements       │       │ degree                  │
├─────────────────────────┤       │ institution             │
│ id (PK)                 │       │ result                  │
│ title                   │       │ year                    │
│ description             │       │ order (int)             │
│ category                │       │ timestamps              │
│ order (int)             │       └─────────────────────────┘
│ timestamps              │
└─────────────────────────┘       ┌─────────────────────────┐
                                  │      ai_tools           │
┌─────────────────────────┐       ├─────────────────────────┤
│      leaderships        │       │ id (PK)                 │
├─────────────────────────┤       │ name, description       │
│ id (PK)                 │       │ url                     │
│ title                   │       │ order (int)             │
│ organization            │       │ timestamps              │
│ description             │       └─────────────────────────┘
│ order (int)             │
│ timestamps              │       ┌─────────────────────────┐
└─────────────────────────┘       │         ides            │
                                  ├─────────────────────────┤
┌─────────────────────────┐       │ id (PK)                 │
│      publications       │       │ name, description       │
├─────────────────────────┤       │ icon                    │
│ id (PK)                 │       │ order (int)             │
│ title, url              │       │ timestamps              │
│ type                     │       └─────────────────────────┘
│ order (int)             │
│ timestamps              │       ┌─────────────────────────┐
└─────────────────────────┘       │  personal_access_tokens │
                                  ├─────────────────────────┤
                                  │ id (PK)                 │
                                  │ tokenable_type/id       │
                                  │ name, token, abilities  │
                                  │ last_used_at            │
                                  │ timestamps              │
                                  └─────────────────────────┘
```

---

## Features

### Public Portfolio Page
- **Dynamic sections** — toggle visibility and reorder from admin
- **Smart navbar** — nav links auto-generated from visible content sections (hero/stats excluded as structural)
- **Scroll-aware active state** — `IntersectionObserver` highlights the current section's nav link as you scroll
- **Dark/Light mode** — persists preference in localStorage
- **Responsive design** — mobile, tablet, desktop breakpoints
- **Animated UI** — fade-in and slide-up transitions
- **Download CV** — resume button in navbar

### Portfolio Sections (configurable via admin)
| Section Key | Description | Nav Link |
|-------------|-------------|----------|
| `hero` | Avatar, name, title, social links | — |
| `stats` | Experience, project, client counters | — |
| `education` | Degrees, institutions, results | ✓ |
| `skills` | Categorized skill bars (Backend, Database, Frontend, DevOps) | ✓ |
| `ai_tools` | AI tools with descriptions and links | ✓ |
| `ides` | Development environments used daily | ✓ |
| `projects` | Featured work with image, links | ✓ |
| `achievements` | Awards and recognitions | ✓ |
| `leadership` | Volunteer and leadership roles | ✓ |
| `publications` | Published articles and profiles | ✓ |
| `contact` | Email, phone, location | ✓ |

> Hero and Stats are structural sections — they render on the page but never appear in the navbar menu. All other visible sections automatically generate a nav link. Hidden sections are hidden from both content and menu with a single toggle.

### Admin Panel
- **Authentication** — username/password login with Sanctum tokens
- **Full CRUD** — create, read, update, delete for all content types
- **Sections Manager** — drag-and-drop reorder, single visibility toggle (controls both page content + nav menu), add/delete custom sections
- **Smart admin tabs** — tabs for content types with hidden sections (`is_visible = false`) are automatically removed from the tab bar
- **Image Upload** — drag-and-drop with gallery viewer
- **Change Password** — secure password update
- **Toast notifications** — success/error messages appear as fixed toast at bottom-right corner with slide-up animation
- **Paginated** — 10 items per page for all listings
- **Validation** — server-side file type and size validation

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

## Installation

### Prerequisites
- **PHP** ^8.0
- **Composer**
- **Node.js** ^16
- **MySQL** 5.7+

### Step-by-step Setup

```bash
# 1. Clone the repository
git clone https://github.com/moshiur1412/injaz-portfolio.git
cd injaz-portfolio

# 2. Install PHP dependencies
composer install

# 3. Install Node.js dependencies
npm install

# 4. Create environment file
cp .env.example .env
```

Configure your database in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=injaz_portfolio
DB_USERNAME=root
DB_PASSWORD=
```

Create the database:

```sql
CREATE DATABASE injaz_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
# 5. Generate application key
php artisan key:generate

# 6. Run migrations
php artisan migrate

# 7. Seed admin user and default sections
php artisan db:seed

# 8. Seed sample portfolio data
php artisan db:seed --class=PortfolioSeeder

# 9. Create storage symlink
php artisan storage:link

# 10. Build frontend
npm run build

# 11. Start development server
php artisan serve
```

Visit **http://localhost:8000** for the public portfolio.  
Visit **http://localhost:8000/login** for the admin panel.

### Admin Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/all` | Fetch all portfolio data |
| GET | `/api/profile` | Fetch profile information |
| GET | `/api/skills` | Fetch all skills |
| GET | `/api/projects` | Fetch visible projects |
| GET | `/api/experiences` | Fetch all experiences |
| GET | `/api/sections` | Fetch all sections with visibility and order |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Login with username/password |
| POST | `/api/logout` | Logout (auth required) |
| GET | `/api/check` | Verify token validity |
| PUT | `/api/change-password` | Change password (auth required) |

### Admin CRUD (all require `auth:sanctum`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/profile` | Update profile |
| POST | `/api/skills` | Create skill |
| PUT | `/api/skills/{id}` | Update skill |
| DELETE | `/api/skills/{id}` | Delete skill |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |
| POST | `/api/experiences` | Create experience |
| PUT | `/api/experiences/{id}` | Update experience |
| DELETE | `/api/experiences/{id}` | Delete experience |
| POST | `/api/educations` | Create education |
| PUT | `/api/educations/{id}` | Update education |
| DELETE | `/api/educations/{id}` | Delete education |
| POST | `/api/achievements` | Create achievement |
| PUT | `/api/achievements/{id}` | Update achievement |
| DELETE | `/api/achievements/{id}` | Delete achievement |
| POST | `/api/leaderships` | Create leadership |
| PUT | `/api/leaderships/{id}` | Update leadership |
| DELETE | `/api/leaderships/{id}` | Delete leadership |
| POST | `/api/publications` | Create publication |
| PUT | `/api/publications/{id}` | Update publication |
| DELETE | `/api/publications/{id}` | Delete publication |
| POST | `/api/ai-tools` | Create AI tool |
| PUT | `/api/ai-tools/{id}` | Update AI tool |
| DELETE | `/api/ai-tools/{id}` | Delete AI tool |
| POST | `/api/ides` | Create IDE entry |
| PUT | `/api/ides/{id}` | Update IDE entry |
| DELETE | `/api/ides/{id}` | Delete IDE entry |
| POST | `/api/upload` | Upload image |
| GET | `/api/images` | Fetch all images |
| GET | `/api/sections/manage` | Get all sections |
| PUT | `/api/sections/manage` | Bulk update sections |
| POST | `/api/sections/manage` | Create new section |
| DELETE | `/api/sections/manage/{id}` | Delete a section |

---

## Project Structure

```
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── ApiController.php      CRUD for all portfolio models
│   │   │   └── AuthController.php     Login, logout, password, sections
│   │   └── Requests/                  Form request validation
│   └── Models/                        Eloquent models
├── database/
│   ├── migrations/                    Schema definitions
│   └── seeders/
│       ├── DatabaseSeeder.php         Seeds admin user + default sections
│       └── PortfolioSeeder.php        Seeds sample portfolio content
├── resources/
│   ├── js/
│   │   ├── pages/
│   │   │   ├── Home.jsx               Public portfolio page
│   │   │   ├── Admin.jsx              Admin panel with all CRUD + settings
│   │   │   └── Login.jsx              Admin login form
│   │   ├── MainApp.jsx                Router + auth state management
│   │   └── app.jsx                    React entry point
│   └── css/
│       └── app.css                    Global styles + admin theme
├── routes/
│   ├── api.php                        API route definitions
│   └── web.php                        Web routes (SPA catch-all)
├── public/
│   └── build/                         Compiled Vite assets
├── composer.json
├── package.json
└── vite.config.js
```

---

## Usage

### Admin Panel

The admin panel provides full content management with tabbed navigation. Tabs for content types whose corresponding portfolio section is hidden are automatically removed.

1. **Profile** — Update personal details, avatar, social links, stats *(always visible)*
2. **Skills** — Manage skill names, categories, proficiency levels, order
3. **Projects** — Add/edit/remove projects with images and links
4. **Experiences** — Work history with dates and descriptions *(always visible)*
5. **Education** — Degrees and certifications
6. **Achievements** — Awards and recognitions
7. **Leadership** — Volunteer and leadership roles
8. **Publications** — Blog posts, profiles, and external links
9. **AI Tools** — Tools used with descriptions
10. **IDEs** — Development environments and tools
11. **Sections** — Drag-and-drop reorder, single visibility toggle, add/delete custom portfolio sections *(always visible)*
12. **Settings** — Change admin password *(always visible)*

### Section Manager

The Sections tab allows you to:
- **Reorder** by dragging items up or down — order updates automatically
- **Toggle visibility** — a single checkbox controls both the page content *and* the navbar menu link
- **Edit labels** to customize section headings
- **Add new sections** with a unique key and display label
- **Delete** unwanted sections
- Changes take effect immediately after saving

> When a section is hidden: its content is removed from the portfolio page, its nav link disappears, and its corresponding admin tab is hidden. When toggled back on, everything reappears in the correct order. Hero and Stats are structural sections — they always render on the page but never appear in the nav menu.

---

## Customization

### Adding a New Content Type
1. Create migration: `php artisan make:migration create_{table}_table`
2. Create model: `app/Models/{ModelName}.php`
3. Add API routes in `routes/api.php`
4. Add CRUD methods in `ApiController.php`
5. Create React components in `resources/js/pages/`
6. Run `php artisan migrate` to apply the schema

### Styling
- Edit `resources/css/app.css` for global styles
- CSS custom properties control the color scheme
- Dark mode uses `[data-theme="dark"]` attribute on `<html>`

---

## Security

- All admin API routes are protected by `auth:sanctum` middleware
- Authentication uses Laravel Sanctum token-based auth
- Passwords are hashed with Bcrypt
- Image upload validates file type (jpeg, png, jpg, gif, webp, svg) and size (max 2MB)
- SQL injection prevention via Eloquent ORM and prepared statements
- XSS protection via React's automatic output escaping

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
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
