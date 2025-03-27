# PlayOn - Streaming Platform

A full-stack Netflix-inspired streaming platform built with the MERN stack (MongoDB, Express, React, Node.js).

<p align="center">
  <img src="/frontend/public/PLAYON.png" alt="PlayOn Logo" width="250">
</p>

## Features

- **User Authentication**: Complete signup/login system with JWT token-based authentication
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Content Browsing**: Browse movies and TV shows by categories like trending, popular, and top-rated
- **Video Playback**: Stream movie trailers and content
- **Watch History**: Keep track of your previously watched content
- **Content Search**: Search for your favorite movies and TV shows
- **Modern UI**: Sleek, intuitive interface with smooth animations and transitions

## Tech Stack

### Frontend
- React.js
- TailwindCSS for styling
- Lucide React for icons
- React Router for navigation
- Axios for API requests
- Zustand for state management
- React Hot Toast for notifications

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Mongoose for database modeling
- TMDB API integration for movie/TV show data

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- TMDB API key (https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/playon.git
cd playon
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

3. Create a `.env` file in the root directory with the following variables
```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```

4. Build the frontend
```bash
cd frontend
npm run build
cd ..
```

5. Start the application
```bash
npm start
```

6. Open your browser and navigate to `http://localhost:5001`

## Development Mode

To run the application in development mode:

1. Start the backend server
```bash
npm start
```

2. In a separate terminal, start the frontend development server
```bash
cd frontend
npm run dev
```

3. Access the frontend at `http://localhost:5173` and the backend at `http://localhost:5001`

## Fallback Mode

If you don't have a valid TMDB API key, you can use dummy data by setting:
```
USE_DUMMY_DATA=true
```
in your environment variables before starting the server.

## Project Structure

```
├── backend/                 # Backend server code
│   ├── config/              # Configuration files
│   ├── controllers/         # API controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── services/            # External API services
│   └── utils/               # Helper functions
├── frontend/                # React frontend code
│   ├── public/              # Static assets
│   └── src/                 # React source code
│       ├── components/      # Reusable components
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Application pages
│       ├── store/           # State management
│       └── utils/           # Utility functions
└── .env                     # Environment variables
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Login a user
- `POST /api/v1/auth/logout` - Logout a user
- `GET /api/v1/auth/authCheck` - Check authentication status

### Movies
- `GET /api/v1/movie/trending` - Get trending movies
- `GET /api/v1/movie/:category` - Get movies by category (popular, top_rated, etc.)
- `GET /api/v1/movie/:id/details` - Get details for a specific movie
- `GET /api/v1/movie/:id/trailers` - Get trailers for a specific movie
- `GET /api/v1/movie/:id/similar` - Get similar movies

### TV Shows
- `GET /api/v1/tv/trending` - Get trending TV shows
- `GET /api/v1/tv/:category` - Get TV shows by category
- `GET /api/v1/tv/:id/details` - Get details for a specific TV show
- `GET /api/v1/tv/:id/trailers` - Get trailers for a specific TV show
- `GET /api/v1/tv/:id/similar` - Get similar TV shows

### Search
- `GET /api/v1/search?query=your_search_term` - Search for movies and TV shows

## Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie and TV show data
- [Netflix](https://www.netflix.com) for the design inspiration
