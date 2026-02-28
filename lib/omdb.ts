import axios from 'axios';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export interface MovieItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    imdbRating?: string;
    Genre?: string;
    Plot?: string;
}

export interface SearchResponse {
    Search?: MovieItem[];
    totalResults?: string;
    Response: string;
    Error?: string;
}

// Generate mock data since no API key is guaranteed
const MOCK_MOVIES: MovieItem[] = [
    { Title: "Inception", Year: "2010", imdbID: "tt1375666", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", imdbRating: "8.8", Genre: "Action, Adventure, Sci-Fi", Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster." },
    { Title: "The Dark Knight", Year: "2008", imdbID: "tt0468569", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0OV5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", imdbRating: "9.0", Genre: "Action, Crime, Drama", Plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
    { Title: "Interstellar", Year: "2014", imdbID: "tt0816692", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDItN2IxOS00ZmRlLTg0NGUtYjUzNDUwZjg1MTRmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", imdbRating: "8.7", Genre: "Adventure, Drama, Sci-Fi", Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
    { Title: "The Matrix", Year: "1999", imdbID: "tt0133093", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", imdbRating: "8.7", Genre: "Action, Sci-Fi", Plot: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence." },
    { Title: "Avengers: Endgame", Year: "2019", imdbID: "tt4154796", Type: "movie", Poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg", imdbRating: "8.4", Genre: "Action, Adventure, Drama", Plot: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe." }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function searchMovies(query: string): Promise<SearchResponse> {
    if (OMDB_API_KEY) {
        try {
            const res = await axios.get(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`);
            return res.data;
        } catch (e) {
            console.error(e);
            return { Response: "False", Error: "Failed to fetch from OMDb API." };
        }
    }

    // Fallback to Mock API
    await delay(800); // Simulate network delay
    if (!query.trim()) {
        return { Response: "False", Error: "Something went wrong." };
    }

    const results = MOCK_MOVIES.filter(m => m.Title.toLowerCase().includes(query.toLowerCase()));
    if (results.length > 0) {
        return { Search: results, totalResults: results.length.toString(), Response: "True" };
    }
    return { Response: "False", Error: "Movie not found!" };
}

export async function getMovieById(id: string): Promise<MovieItem | null> {
    if (OMDB_API_KEY) {
        try {
            const res = await axios.get(`${BASE_URL}?i=${encodeURIComponent(id)}&apikey=${OMDB_API_KEY}&plot=full`);
            if (res.data.Response === 'True') {
                return res.data as MovieItem;
            }
            return null;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    // Fallback to Mock API
    await delay(500);
    const movie = MOCK_MOVIES.find(m => m.imdbID === id);
    return movie || null;
}
