import httpService from "./httpService";
import config from "../config.json";

export function getMovies() {
  return httpService.get(`${config.apiUrl}/movies`);
}

export function deleteMovie(movieId) {
  return httpService.delete(`${config.apiUrl}/movies/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    return httpService.put(`${config.apiUrl}/movies/${movie._id}`, body);
  }

  return httpService.post(`${config.apiUrl}/movies/`, movie);
}

export function getMovie(movieId) {
  return httpService.get(`${config.apiUrl}/movies/${movieId}`);
}
