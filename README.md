# Movie Browsing Web Application

A modern, responsive web application built with React and Next.js that allows users to search for movies, view details, and save their favorites. 

## Features

- **Authentication:** Secure sign-up, sign-in, and route protection using Clerk.
- **Movie Search:** Fast, debounced searching using the OMDb API (with fallback to mock data).
- **Movie Details:** View high-quality posters, genres, release years, IMDb ratings, and full plot summaries.
- **Favorites System:** Save movies to your favorites list, persisted locally using Zustand.
- **Modern UI:** Built with Tailwind CSS, supporting both Light and Dark modes.

## Tech Stack

1. **Framework:** Next.js 15 (App Router) with React 19
2. **Styling:** Tailwind CSS (v4) with `clsx` and `tailwind-merge` for dynamic class management.
3. **Authentication:** `@clerk/nextjs` for handling user sessions and protected routes.
4. **State Management:** `zustand` with persistent storage middleware for managing the favorites list.
5. **Data Fetching:** `axios` for querying the OMDb API.
6. **Icons:** `lucide-react` for clean, consistent UI icons.

## Folder Structure

```
movie_app/
├── app/                  # Next.js App Router root
│   ├── (auth)/           # Clerk authentication routes (sign-in/sign-up)
│   ├── favorites/        # Protected favorites page
│   ├── movie/[id]/       # Dynamic route for individual movie details
│   ├── globals.css       # Global styles and Tailwind configuration
│   ├── layout.tsx        # Root layout wrapping the app with providers & Navbar
│   └── page.tsx          # Home page displaying the search dashboard
├── components/           # Reusable React components
│   ├── ErrorState.tsx    # Standardized error component
│   ├── Loader.tsx        # Standardized loading indicator
│   ├── MovieCard.tsx     # Card component for displaying movie previews
│   ├── Navbar.tsx        # Top navigation bar with auth & theme toggles
│   └── SearchBar.tsx     # Debounced search input
├── hooks/                # Custom React hooks
│   └── useDebounce.ts    # Hook for delaying search queries dynamically
├── lib/                  # Utility functions and API clients
│   ├── omdb.ts           # OMDb API integration and fallback mock logic
│   └── utils.ts          # Styling utilities (cn)
├── store/                # Global state management
│   └── useFavoriteStore.ts # Zustand store handling local storage sync
└── middleware.ts         # Next.js middleware protecting secure routes
```

## Instructions to Run

1. **Clone the repository:**
   Ensure you have the code downloaded into your local environment.

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` or `.env` file in the root directory. You will need your Clerk keys and an OMDb API key:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
   ```
   *(Note: If the OMDb API key is missing, the app will gracefully fallback to using mock placeholder data).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the result. You will be prompted to sign in or create an account before accessing the dashboard.
