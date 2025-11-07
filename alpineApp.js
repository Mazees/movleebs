document.addEventListener("alpine:init", () => {
  Alpine.data("movieApp", () => ({
    movies: [],
    moviesCopy: [],
    async init() {
      this.movies = await window.fetchMovies(1);
      this.moviesCopy = [...this.movies];
    },
    searchMovie(query) {
      this.moviesCopy = window.searchMovies(this.movies, query);
    },
    searchMovieByDate(key) {
      this.moviesCopy = window.sortByDate(this.movies, key);
    },
  }));
});