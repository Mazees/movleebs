  document.addEventListener("alpine:init", () => {
    Alpine.data("movieApp", () => ({
      movies: [],
      moviesCopy: [],
      status: {isLoading: true},
      page: 50,
      async init() {
        this.movies = await window.fetchMovies(20, this.status);
        this.moviesCopy = [...this.movies];
      },
      searchMovie(query) {
        this.moviesCopy = window.searchMovies(this.movies, query);
      },
      sortMovie(props,asc){
        console.log(this.movies)
        this.moviesCopy = sort(this.movies, props,asc);
      },
      async openMovie(dataMovie){
        localStorage.setItem('dataMovie', JSON.stringify(dataMovie));
        window.location.href = './detail-movie/';
      }
    }));
  });