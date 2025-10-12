const API_KEY = "3efd6efc62dfd1abdb09616e7442b253";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchFromTMDB(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  return data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.slice(0, 4),
    poster: movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : "/placeholder.png",
    overview: movie.overview,
    rating: movie.vote_average
  }));
}

export async function searchMovies(query) {
  if (!query) return [];
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`);
  const data = await response.json();

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.png",
    rating: movie.vote_average,
    year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
  }));
}

export async function getPopularMovies() {
  return await fetchFromTMDB("/movie/popular");
}

export async function getNowPlayingMovies() {
  return await fetchFromTMDB("/movie/now_playing");
}

export async function getTopRatedMovies() {
  return await fetchFromTMDB("/movie/top_rated");
}

export async function getTrendingMovies() {
  return await fetchFromTMDB("/trending/movie/week");
}
