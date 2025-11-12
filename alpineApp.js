  document.addEventListener("alpine:init", () => {
    Alpine.data("movieApp", () => ({
      movies: [],
      moviesCopy: [],
      dataMovie: {},
      status: {isLoading: true},
      page: 50,
      async init() {
        this.movies = await window.fetchMovies(20, this.status);
        this.moviesCopy = [...this.movies];
      },
      searchMovie(query) {
        this.moviesCopy = window.searchMovies(this.movies, query);
      },
      searchMovieByDate(key) {
        this.moviesCopy = window.sortByDate(this.movies, key);
      },
      async openMovie(id){
        this.dataMovie = await window.getDataMovie(id);
        localStorage.setItem('dataMovie', JSON.stringify(this.dataMovie));
        window.location.href = './detail-movie/';
      }
    }));
  });