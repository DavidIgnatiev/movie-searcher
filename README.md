# Movie Searcher

A web application for searching movies and TV shows with the ability to save favorites.

Live demo: https://davidignatiev.github.io/movie-searcher/

# Features

- 🔍 Search movies and TV shows by title
- 🎬 Detailed movie info: plot, cast, director, ratings, runtime
- ⭐ Save favorites to localStorage
- 🎲 Random movies on page load
- 📱 Responsive design (mobile, tablet, desktop)
- 🔄 Loader during API requests
- ❌ Error handling for failed searches

# Tech Stack

- HTML5, CSS3, JavaScript (ES6 modules)
- OMDb API
- localStorage for favorites
- GitHub Pages for deployment

# Project Structure

movie-searcher/
├── css/
│   ├── reset.css
│   └── styles.css
├── images/
├── js/
│   ├── api.js       ← API requests
│   ├── favorites.js ← localStorage logic
│   ├── ui.js        ← DOM rendering
│   └── main.js      ← entry point, events
└── index.html

How to Run Locally

1. Clone the repository
2. Open with Live Server in VSCode
