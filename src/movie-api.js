import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzNhZGJhNzcwZmY5ZDM1M2Q2NTQwMWJjMjc4N2NhNSIsInN1YiI6IjY2NTMwMzAyOGIxM2NhN2E1YmIzZTk3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-8Cv6W9d9jwKVH1YXsFYDNfm2UqJLJerlYb7HQdRc7Y";

export const getMovieTrending = async () => {
  const response = await axios.get("/trending/movie/day");
  return response.data;
};

export const getMovieSearch = async (searchQuery) => {
  const response = await axios.get("/search/movie", {
    params: { query: searchQuery },
  });
  return response.data;
};

export const getMovieBuId = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
