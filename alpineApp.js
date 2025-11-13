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
      sortMovie(props,asc){
        console.log(this.movies)
        this.moviesCopy = sort(this.movies, props,asc);
      },
      async openMovie(id, title){
        this.dataMovie = await window.getDataMovie(id);
        localStorage.setItem('dataMovie', JSON.stringify(this.dataMovie));
        localStorage.setItem('title', title);
        window.location.href = './detail-movie/';
      }
    }));
  });