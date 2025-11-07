document.addEventListener("alpine:init", () => {
  Alpine.data("movieApp", () => ({
    movies: [],
    async init() {
      this.movies = await window.fetchMovies(5);
    },
    cari(query) {
      this.movies = window.searchMovies(this.movies, query);
    },
    urut(key) {
      this.movies = window.sortByDate(this.movies, key);
    },
  }));
});