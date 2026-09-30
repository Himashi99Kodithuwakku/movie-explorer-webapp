# 🎬 Movie Explorer Web Application

A modern, responsive, feature-rich web application for discovering movies, watching official trailers, exploring genres, searching search history, and managing favorite films. Built with **React 19**, **Material-UI (MUI v6/v9)**, and **TMDb (The Movie Database) API**.

![React](https://img.shields.io/badge/React-19.3.0-61DAFB?logo=react&logoColor=black)
![MUI](https://img.shields.io/badge/MUI-Material--UI-007FFF?logo=mui&logoColor=white)
![TMDb](https://img.shields.io/badge/TMDb-API_v3-01b4e4?logo=themoviedatabase&logoColor=white)
![Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?logo=vercel&logoColor=white)

---

## 📋 Table of Contents

- [✨ Features Implemented](#-features-implemented)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start & Project Setup](#-quick-start--project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables Setup](#environment-variables-setup)
- [💻 Available Scripts](#-available-scripts)
- [🔌 API Usage & Endpoints](#-api-usage--endpoints)
- [📁 Project Structure](#-project-structure)
- [☁️ Deploying to Vercel](#️-deploying-to-vercel)
- [📄 License](#-license)

---

## ✨ Features Implemented

### 1. 🔍 Interactive Search & Search History
- **Live Search**: Integrated navbar search bar with instant query execution.
- **Search History Dropdown**: Automatically saves recent search queries in `localStorage`.
- **Search History Management**: View query timestamps, badge counters, click past searches to re-search, or clear history.

### 2. 🍿 Movie Exploration & Filtering
- **Trending & Featured Movies**: Explore daily and weekly trending titles.
- **Genre & Attribute Filter Bar**: Filter by genres, release year, minimum rating, and sort order.
- **Responsive Mobile Filters**: Optimized filter drawer for mobile displays with icon-only reset buttons for clean layout presentation.

### 3. 🎬 Movie Details Modal & YouTube Trailer Player
- **Sleek Backdrop Blur**: Opening movie details applies a modern, subtle background blur effect (`backdrop-filter`).
- **Official YouTube Trailers**: Direct integration with TMDb Videos API to stream official trailers in an embedded iframe.
- **Cast & Crew Details**: View cast member cards with profile images and character roles.

### 4. ❤️ Favorites System
- **Bookmark Movies**: Add/remove movies from favorites with dynamic heart toggles.
- **Persistent Storage**: Saved movies persist across browser sessions using `localStorage`.
- **User-Friendly Empty States**: Clean, informative empty-state message and layout on the Favorites page.

### 5. 🔐 Authentication & Session Handling
- **User Authentication Flow**: User login/logout states with custom `MovieContext`.
- **State Reset on Logout**: Clearing search input, filters, and state when a user logs out for a clean slate upon re-login.

### 6. 📱 Responsive UI & Navigation
- **Dynamic Mobile Bar**: Responsive navigation bar featuring adaptive icons (e.g., Home icon replacing text links on smaller screens).
- **Dark Theme Aesthetics**: Styled with Material-UI dark mode theme and custom CSS glassmorphism effects.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, JavaScript (ES6+), HTML5, CSS3
- **UI Framework**: Material-UI (`@mui/material`, `@mui/icons-material`), Emotion (`@emotion/react`, `@emotion/styled`)
- **Routing**: `react-router-dom` (v7)
- **HTTP Client**: Axios
- **Data Source**: The Movie Database (TMDb) REST API
- **State Management**: React Context API (`MovieContext`) & custom hooks

---

## 🚀 Quick Start & Project Setup

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js**: `v16.x` or higher (Recommended: `v18+` or `v20+`)
- **npm**: `v8.x` or higher (bundled with Node.js)
- **Git**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Himashi99Kodithuwakku/movie-explorer-webapp.git
   cd movie-explorer-webapp
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

---

### Environment Variables Setup

The application requires a **TMDb API Key** to fetch movie details, posters, cast, and video trailers.

#### Step 1: Create the `.env` file

Run one of the following commands in your terminal at the root of the project:

- **Windows PowerShell**:
  ```powershell
  New-Item -Path . -Name ".env" -ItemType "File"
  ```
- **Linux / macOS / Git Bash**:
  ```bash
  touch .env
  ```
- **Windows Command Prompt (CMD)**:
  ```cmd
  type nul > .env
  ```

#### Step 2: Populate `.env` configuration

Open `.env` in your code editor and add the following configuration keys:

```env
# TMDb API Configuration
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
REACT_APP_TMDB_ORIGINAL_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

> 🔑 **How to get a TMDb API Key**:
> 1. Create an account at [The Movie Database (TMDb)](https://www.themoviedb.org/).
> 2. Go to **Account Settings** -> **API**.
> 3. Create an API Key (Developer request) and copy your **API Key (v3 auth)** into `REACT_APP_TMDB_API_KEY`.

---

## 💻 Available Scripts

In the project directory, you can run the following scripts:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page reloads automatically when code changes are saved.

### `npm run build`
Builds the app for production into the `build/` folder.\
It correctly bundles React in production mode and optimizes the build for performance.

### `npm test`
Launches the interactive test runner.

---

## 🔌 API Usage & Endpoints

All API requests are managed via `axios` in [src/api/tmdb.js](file:///f:/Project/movie-explorer-webapp/src/api/tmdb.js).

Key endpoints utilized:

| Resource | Endpoint | Description |
| :--- | :--- | :--- |
| **Trending Movies** | `/trending/movie/day` | Fetches current daily trending movies |
| **Search Movies** | `/search/movie` | Searches movies matching a text query |
| **Discover & Filter** | `/discover/movie` | Filters movies by genre, release year, rating, and sort order |
| **Genre List** | `/genre/movie/list` | Retrieves official TMDb genre list |
| **Movie Details** | `/movie/{movie_id}` | Fetches full movie overview, runtime, genres |
| **Cast & Credits** | `/movie/{movie_id}/credits` | Fetches cast members and crew details |
| **Movie Videos** | `/movie/{movie_id}/videos` | Fetches YouTube trailers and teasers |

---

## 📁 Project Structure

```text
movie-explorer-webapp/
├── public/                  # Public static assets & index.html
├── src/
│   ├── api/                 # Axios client & TMDb API methods
│   │   └── tmdb.js
│   ├── components/          # Reusable UI components
│   │   ├── auth/            # Login & authentication forms
│   │   ├── common/          # Navbar, Footer, Layout components
│   │   └── movies/          # Movie cards, details modal, filter bar, search history
│   ├── context/             # Global React Context (MovieContext, Auth)
│   ├── hooks/               # Custom hooks (useMovies, etc.)
│   ├── pages/               # Page views (Home, Favorites, MovieDetails)
│   ├── utils/               # Helper utilities & storage handlers
│   ├── App.js               # Main routing & application component
│   ├── App.css              # Global custom styling & component overrides
│   └── index.js             # React application entry point
├── .env                     # Local environment configuration (API keys)
├── vercel.json              # Vercel SPA route rewrite configuration
├── package.json             # NPM dependencies & scripts
└── README.md                # Project documentation
```

---

## ☁️ Deploying to Vercel

This repository includes [vercel.json](file:///f:/Project/movie-explorer-webapp/vercel.json) pre-configured with SPA route rewrites (`destination: "/index.html"`).

### Steps to Deploy:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy setup"
   git push origin main
   ```
2. Log in to **[Vercel](https://vercel.com/)** and click **Import Project**.
3. Select your `movie-explorer-webapp` repository.
4. In **Environment Variables**, add:
   - `REACT_APP_TMDB_API_KEY`
   - `REACT_APP_TMDB_BASE_URL`
   - `REACT_APP_TMDB_IMAGE_BASE_URL`
   - `REACT_APP_TMDB_ORIGINAL_IMAGE_BASE_URL`
5. Click **Deploy**.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
